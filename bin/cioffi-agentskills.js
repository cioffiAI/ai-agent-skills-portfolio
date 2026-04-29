#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const DEFAULT_REPO = "cioffiAI/ai-agent-skills-portfolio";
const DEFAULT_REF = "main";
const VALID_TARGETS = new Set(["codex", "claude", "both"]);
const REQUIRED_SECTIONS = ["---", "name:", "description:", "## Objective", "## Procedure", "## Output", "## Limits"];
const PACKAGE_ROOT = path.resolve(__dirname, "..");

function main(argv) {
  run(argv)
    .then((result) => {
      printSuccess(result);
    })
    .catch((error) => {
      printError(normalizeError(error), hasFlag(argv, "--json"));
      process.exitCode = 1;
    });
}

async function run(argv) {
  const parsed = parseArgs(argv);

  if (parsed.version) {
    return {
      ok: true,
      command: "version",
      json: parsed.json,
      text: getPackageVersion(),
      results: [{ version: getPackageVersion() }],
    };
  }

  if (parsed.help || !parsed.command) {
    return {
      ok: true,
      command: "help",
      json: parsed.json,
      text: helpText(),
      results: [],
    };
  }

  if (!VALID_TARGETS.has(parsed.target)) {
    throw cliError("INVALID_TARGET", "--target must be one of: codex, claude, both");
  }

  if (parsed.command === "doctor") {
    return doctor(parsed);
  }

  if (parsed.command === "list") {
    return listSkills(parsed);
  }

  if (parsed.command === "install") {
    return installSkill(parsed);
  }

  if (parsed.command === "uninstall") {
    return uninstallSkill(parsed);
  }

  throw cliError("UNKNOWN_COMMAND", `Unknown command: ${parsed.command}`);
}

function parseArgs(argv) {
  const result = {
    command: null,
    positional: [],
    json: false,
    dryRun: false,
    force: false,
    yes: false,
    help: false,
    version: false,
    target: "both",
    repo: DEFAULT_REPO,
    ref: DEFAULT_REF,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--json") {
      result.json = true;
    } else if (arg === "--dry-run") {
      result.dryRun = true;
    } else if (arg === "--yes" || arg === "-y") {
      result.yes = true;
    } else if (arg === "--force") {
      result.force = true;
    } else if (arg === "--help" || arg === "-h") {
      result.help = true;
    } else if (arg === "--version" || arg === "-v") {
      result.version = true;
    } else if (arg === "--target" || arg === "--repo" || arg === "--ref") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw cliError("MISSING_FLAG_VALUE", `${arg} requires a value`);
      }
      result[flagName(arg)] = value;
      index += 1;
    } else if (arg.startsWith("--target=") || arg.startsWith("--repo=") || arg.startsWith("--ref=")) {
      const [name, value] = arg.split("=", 2);
      if (!value) {
        throw cliError("MISSING_FLAG_VALUE", `${name} requires a value`);
      }
      result[flagName(name)] = value;
    } else if (arg.startsWith("--")) {
      throw cliError("UNKNOWN_FLAG", `Unknown flag: ${arg}`);
    } else if (!result.command) {
      result.command = arg;
    } else {
      result.positional.push(arg);
    }
  }

  return result;
}

function flagName(flag) {
  return flag.replace(/^--/, "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

async function doctor(options) {
  const targets = targetDirectories(options.target);
  const github = await checkGithub(options.repo, options.ref);
  const results = [
    {
      check: "node",
      ok: typeof fetch === "function",
      version: process.version,
      minimum: ">=18",
    },
    github,
  ];

  for (const target of targets) {
    const parent = path.dirname(target.skillsDir);
    const writable = await canWriteDirectory(parent);
    results.push({
      check: `${target.name}-target`,
      ok: writable.ok,
      target: target.name,
      path: target.skillsDir,
      exists: fs.existsSync(target.skillsDir),
      writable: writable.ok,
      message: writable.message,
    });
  }

  const ok = results.every((item) => item.ok);
  return {
    ok,
    command: "doctor",
    json: options.json,
    text: formatDoctor(results),
    results,
  };
}

async function listSkills(options) {
  const skills = listLocalSkills();

  return {
    ok: true,
    command: "list",
    json: options.json,
    text: skills.map((skill) => skill.name).join("\n"),
    results: skills,
  };
}

function listLocalSkills() {
  const skillsDir = path.join(PACKAGE_ROOT, "skills");

  return fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(skillsDir, entry.name, "SKILL.md")))
    .map((entry) => ({
      name: entry.name,
      source: path.join(skillsDir, entry.name),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}


async function installSkill(options) {
  const skillName = options.positional[0];
  if (!skillName) {
    throw cliError("MISSING_SKILL", "install requires a skill name");
  }
  validateSkillName(skillName);

if (skillName === "all") {
  return installAllSkills(options);
}

const sourceDir = path.join(PACKAGE_ROOT, "skills", skillName);
const skillPath = path.join(sourceDir, "SKILL.md");

  if (!fs.existsSync(skillPath)) {
    throw cliError("SKILL_NOT_FOUND", `Skill not found: ${skillName}`);
  }

  const content = fs.readFileSync(skillPath, "utf8");
  const missing = missingRequiredSections(content);
  if (missing.length > 0) {
    throw cliError("INVALID_SKILL", `Skill is missing required sections: ${missing.join(", ")}`);
  }

  const targets = targetDirectories(options.target);
  const actions = [];

  for (const target of targets) {
    const skillDir = path.join(target.skillsDir, skillName);
    const skillPath = path.join(skillDir, "SKILL.md");
    const exists = fs.existsSync(skillDir);
    const backupPath = exists ? uniqueBackupPath(target.skillsDir, skillName) : null;

    actions.push({
      target: target.name,
      skill: skillName,
      skillDir,
      skillPath,
      exists,
      backupPath,
      source: sourceDir,
    });
  }

  if (options.dryRun) {
    return {
      ok: true,
      command: "install",
      json: options.json,
      text: formatInstallDryRun(actions),
      results: actions.map((a) => ({
        ...a,
        dryRun: true,
        installed: false,
      })),
    };
  }

  if (options.json && !options.yes) {
    throw cliError(
      "CONFIRMATION_REQUIRED",
      "Use --yes with --json to confirm non-interactive installation"
    );
  }

  if (!options.json && !options.yes) {
    const confirmed = await askConfirm(actions);
    if (!confirmed) {
      return {
        ok: false,
        command: "install",
        json: false,
        text: "Install cancelled.",
        results: [],
      };
    }
  }

  const results = [];
  for (const action of actions) {
    const { skillDir, exists } = action;
    const target = targets.find((t) => t.name === action.target);

    if (exists && !options.force) {
      results.push({
        target: action.target,
        skill: action.skill,
        path: skillDir,
        installed: false,
        skipped: true,
        reason: "already_exists",
      });
      continue;
    }

    fs.mkdirSync(target.skillsDir, { recursive: true });
    if (exists) {
      fs.renameSync(skillDir, action.backupPath);
    }
    fs.cpSync(sourceDir, skillDir, { recursive: true });

    results.push({
      target: action.target,
      skill: action.skill,
      path: skillDir,
      installed: true,
      backup: action.backupPath,
      source: action.source,
    });
  }

  return {
    ok: true,
    command: "install",
    json: options.json,
    text: formatInstall(results),
    results,
  };
}

async function uninstallSkill(options) {
  const skillName = options.positional[0];
  if (!skillName) {
    throw cliError("MISSING_SKILL", "uninstall requires a skill name or all");
  }
  validateSkillName(skillName);

  const skillNames = skillName === "all"
    ? listLocalSkills().map((skill) => skill.name)
    : [skillName];

  if (skillNames.length === 0) {
    throw cliError("NO_SKILLS_FOUND", "No local skills found in package");
  }

  if (skillName !== "all" && !fs.existsSync(path.join(PACKAGE_ROOT, "skills", skillName, "SKILL.md"))) {
    throw cliError("SKILL_NOT_FOUND", `Skill not found: ${skillName}`);
  }

  const targets = targetDirectories(options.target);
  const actions = [];

  for (const name of skillNames) {
    for (const target of targets) {
      const skillDir = path.join(target.skillsDir, name);
      actions.push({
        target: target.name,
        skill: name,
        skillDir,
        exists: fs.existsSync(skillDir),
      });
    }
  }

  if (options.dryRun) {
    return {
      ok: true,
      command: "uninstall",
      json: options.json,
      text: formatUninstallDryRun(actions),
      results: actions.map((action) => ({
        ...action,
        dryRun: true,
        uninstalled: false,
      })),
    };
  }

  if (options.json && !options.yes) {
    throw cliError(
      "CONFIRMATION_REQUIRED",
      "Use --yes with --json to confirm non-interactive uninstallation"
    );
  }

  if (!options.json && !options.yes) {
    const confirmed = await askConfirm(actions, "uninstall");
    if (!confirmed) {
      return {
        ok: false,
        command: "uninstall",
        json: false,
        text: "Uninstall cancelled.",
        results: [],
      };
    }
  }

  const results = [];

  for (const action of actions) {
    if (!action.exists) {
      results.push({
        target: action.target,
        skill: action.skill,
        path: action.skillDir,
        uninstalled: false,
        skipped: true,
        reason: "not_installed",
      });
      continue;
    }

    fs.rmSync(action.skillDir, { recursive: true, force: true });

    results.push({
      target: action.target,
      skill: action.skill,
      path: action.skillDir,
      uninstalled: true,
    });
  }

  return {
    ok: true,
    command: "uninstall",
    json: options.json,
    text: formatUninstall(results),
    results,
  };
}

async function installAllSkills(options) {
  const skills = listLocalSkills();

  if (skills.length === 0) {
    throw cliError("NO_SKILLS_FOUND", "No local skills found in package");
  }

  const targets = targetDirectories(options.target);
  const actions = [];

  for (const skill of skills) {
    const skillName = skill.name;
    const sourceDir = path.join(PACKAGE_ROOT, "skills", skillName);
    const skillPath = path.join(sourceDir, "SKILL.md");

    const content = fs.readFileSync(skillPath, "utf8");
    const missing = missingRequiredSections(content);

    if (missing.length > 0) {
      throw cliError(
        "INVALID_SKILL",
        `Skill ${skillName} is missing required sections: ${missing.join(", ")}`
      );
    }

    for (const target of targets) {
      const skillDir = path.join(target.skillsDir, skillName);
      const destinationSkillPath = path.join(skillDir, "SKILL.md");
      const exists = fs.existsSync(skillDir);
      const backupPath = exists ? uniqueBackupPath(target.skillsDir, skillName) : null;

      actions.push({
        target: target.name,
        skill: skillName,
        sourceDir,
        skillDir,
        skillPath: destinationSkillPath,
        exists,
        backupPath,
        source: sourceDir,
      });
    }
  }

  if (options.dryRun) {
    return {
      ok: true,
      command: "install",
      json: options.json,
      text: formatInstallDryRun(actions),
      results: actions.map((action) => ({
        ...action,
        dryRun: true,
        installed: false,
      })),
    };
  }

  if (options.json && !options.yes) {
    throw cliError(
      "CONFIRMATION_REQUIRED",
      "Use --yes with --json to confirm non-interactive installation"
    );
  }

  if (!options.json && !options.yes) {
    const confirmed = await askConfirm(actions);
    if (!confirmed) {
      return {
        ok: false,
        command: "install",
        json: false,
        text: "Install cancelled.",
        results: [],
      };
    }
  }

  const results = [];

  for (const action of actions) {
    const target = targets.find((item) => item.name === action.target);

    if (action.exists && !options.force) {
      results.push({
        target: action.target,
        skill: action.skill,
        path: action.skillDir,
        installed: false,
        skipped: true,
        reason: "already_exists",
      });
      continue;
    }

    fs.mkdirSync(target.skillsDir, { recursive: true });

    if (action.exists) {
      fs.renameSync(action.skillDir, action.backupPath);
    }

    fs.cpSync(action.sourceDir, action.skillDir, { recursive: true });

    results.push({
      target: action.target,
      skill: action.skill,
      path: action.skillDir,
      installed: true,
      backup: action.backupPath,
      source: action.source,
    });
  }

  return {
    ok: true,
    command: "install",
    json: options.json,
    text: formatInstall(results),
    results,
  };
}

async function askConfirm(actions, actionName = "install") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const lines = actions.map((action) => {
  if (actionName === "uninstall") {
    if (action.exists) {
      return `  Uninstall: ${action.skillDir}`;
    }
    return `  Not installed, will skip: ${action.skillDir}`;
  }

  if (action.exists) {
    return `  Exists, will skip unless --force: ${action.skillDir}`;
  }
  return `  Install: ${action.skillDir}`;
});


  const question = `Confirm ${actionName} (${actions.length} target${actions.length > 1 ? "s" : ""})?\n${lines.join("\n")}\n[y/N] `;

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

function formatInstallDryRun(actions) {
  return actions
    .map((action) => {
      if (action.exists) {
        return `Would skip existing skill unless --force: ${action.skillDir}`;
      }
      return `Would install: ${action.skillDir}`;
    })
    .join("\n");
}

function formatUninstallDryRun(actions) {
  return actions
    .map((action) => {
      if (action.exists) {
        return `Would uninstall: ${action.skillDir}`;
      }
      return `Would skip missing skill: ${action.skillDir}`;
    })
    .join("\n");
}

function targetDirectories(target) {
  const home = os.homedir();
  const targets = {
    codex: {
      name: "codex",
      skillsDir: path.join(home, ".codex", "skills"),
    },
    claude: {
      name: "claude",
      skillsDir: path.join(home, ".claude", "skills"),
    },
  };

  if (target === "both") {
    return [targets.codex, targets.claude];
  }

  return [targets[target]];
}

async function checkGithub(repo, ref) {
  try {
    const response = await fetch(githubContentsUrl(repo, ref));
    return {
      check: "github",
      ok: response.ok,
      repo,
      ref,
      status: response.status,
      message: response.ok ? "GitHub reachable" : `GitHub returned ${response.status}`,
    };
  } catch (error) {
    return {
      check: "github",
      ok: false,
      repo,
      ref,
      message: error.message,
    };
  }
}

async function canWriteDirectory(directory) {
  const probe = path.join(directory, `.cioffi-agentskills-${process.pid}.tmp`);
  try {
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(probe, "ok", "utf8");
    fs.rmSync(probe, { force: true });
    return { ok: true, message: "Writable" };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

async function fetchSkillList(repo, ref) {
  const response = await fetch(githubContentsUrl(repo, ref));
  if (!response.ok) {
    throw cliError("FETCH_SKILLS_FAILED", `Could not list skills from GitHub: ${response.status}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw cliError("INVALID_GITHUB_RESPONSE", "GitHub did not return a skills directory listing");
  }

  return payload
    .filter((item) => item.type === "dir")
    .map((item) => ({
      name: item.name,
      source: item.html_url,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function githubContentsUrl(repo, ref) {
  return `https://api.github.com/repos/${repo}/contents/skills?ref=${encodeURIComponent(ref)}`;
}

function validateSkillName(skillName) {
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(skillName)) {
    throw cliError("INVALID_SKILL_NAME", "Skill name may only contain letters, numbers, and hyphens");
  }
}

function missingRequiredSections(content) {
  return REQUIRED_SECTIONS.filter((section) => !content.includes(section));
}

function uniqueBackupPath(skillsDir, skillName) {
  const stamp = timestamp();
  let candidate = path.join(skillsDir, `${skillName}.backup-${stamp}`);
  let suffix = 2;

  while (fs.existsSync(candidate)) {
    candidate = path.join(skillsDir, `${skillName}.backup-${stamp}-${suffix}`);
    suffix += 1;
  }

  return candidate;
}

function timestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "-",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
}

function formatDoctor(results) {
  return results
    .map((result) => {
      const status = result.ok ? "OK" : "FAIL";
      return `${status} ${result.check}: ${result.message || result.version || ""}`.trim();
    })
    .join("\n");
}

function formatInstall(results) {
  return results
    .map((result) => {
      if (result.skipped) {
        return `Skipped ${result.skill} for ${result.target}: ${result.path} reason=${result.reason}`;
      }

      const action = result.dryRun ? "Would install" : "Installed";
      const backup = result.backup ? ` backup=${result.backup}` : "";
      return `${action} ${result.skill} for ${result.target}: ${result.path}${backup}`;
    })
    .join("\n");
}

function formatUninstall(results) {
  return results
    .map((result) => {
      if (result.skipped) {
        return `Skipped ${result.skill} for ${result.target}: ${result.path} reason=${result.reason}`;
      }

      return `Uninstalled ${result.skill} for ${result.target}: ${result.path}`;
    })
    .join("\n");
}

function printSuccess(result) {
  if (!result.ok) {
    process.exitCode = 1;
  }

  if (result.json) {
    process.stdout.write(`${JSON.stringify({ ok: result.ok, command: result.command, results: result.results }, null, 2)}\n`);
    return;
  }

  if (result.text) {
    process.stdout.write(`${result.text}\n`);
  }
}

function printError(error, asJson) {
  if (asJson) {
    process.stderr.write(`${JSON.stringify({ ok: false, error }, null, 2)}\n`);
    return;
  }

  process.stderr.write(`Error [${error.code}]: ${error.message}\n`);
}

function cliError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function normalizeError(error) {
  return {
    code: error.code || "UNEXPECTED_ERROR",
    message: error.message || String(error),
  };
}

function hasFlag(argv, flag) {
  return argv.includes(flag) || argv.some((arg) => arg.startsWith(`${flag}=`));
}

function getPackageVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
    return packageJson.version;
  } catch (_error) {
    return "unknown";
  }
}

function helpText() {
  return `cioffi-agentskills

Install packaged AI agent skills for Codex and Claude Code.

Usage:
  cioffi-agentskills install <skill> [--json] [--dry-run] [--yes] [--force] [--target codex|claude|both]
  cioffi-agentskills uninstall <skill|all> [--json] [--dry-run] [--yes] [--target codex|claude|both]
  cioffi-agentskills list [--json] [--repo owner/name] [--ref ref]
  cioffi-agentskills install <skill> [--json] [--dry-run] [--yes] [--force] [--target codex|claude|both] [--repo owner/name] [--ref ref]

Options:
  --target <target>  Install/uninstall/check codex, claude, or both. Default: both.
  --repo <repo>      GitHub repo owner/name for doctor/list. Default: ${DEFAULT_REPO}.
  --ref <ref>        Git ref for doctor/list. Default: ${DEFAULT_REF}.
  --json             Print stable JSON output (skips all prompts).
  --dry-run          Show install/uninstall actions without writing files.
  --yes, -y          Skip confirmation prompt (auto-confirm).
  --force            Existing installs are backed up before replacement.
  --version, -v      Print the CLI version.
  --help, -h         Show this help.
`;
}

main(process.argv.slice(2));
