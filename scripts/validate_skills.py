from pathlib import Path


REQUIRED_SECTIONS = [
    "---",
    "name:",
    "description:",
    "## Objective",
    "## Procedure",
    "## Output",
    "## Limits",
]

SKILLS_DIR = Path("skills")


def validate_skill(path: Path) -> list[str]:
    content = path.read_text(encoding="utf-8")
    missing = []

    for section in REQUIRED_SECTIONS:
        if section not in content:
            missing.append(section)

    return missing


def main() -> int:
    if not SKILLS_DIR.exists():
        print("ERROR: skills/ directory not found")
        return 1

    skill_files = sorted(SKILLS_DIR.glob("*/SKILL.md"))

    if not skill_files:
        print("ERROR: no SKILL.md files found")
        return 1

    errors = 0

    for skill_file in skill_files:
        missing = validate_skill(skill_file)

        if missing:
            errors += 1
            print(f"FAIL: {skill_file.as_posix()}")
            for item in missing:
                print(f"  missing: {item}")
        else:
            print(f"OK: {skill_file.as_posix()}")

    print()
    print(f"Checked skills: {len(skill_files)}")
    print(f"Invalid skills: {errors}")

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
