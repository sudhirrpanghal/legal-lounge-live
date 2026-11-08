#!/usr/bin/env python3
"""Keep low-grade Acts off the site.

The Bare Acts Library catalogue gives every Act a quality grade (A, B, C).
Acts graded C (see HIDE_GRADES, or "hideGrades" in bare-acts/config.json) must not be published.
The library page already hides them, but their files would still be downloadable from the repository,
so run this before uploading new data:

    python3 tools/bare-acts-gate.py            # report only
    python3 tools/bare-acts-gate.py --apply    # remove them from the data you are about to upload

It removes the Acts from data/catalogue.json and data/search-index.json, deletes their
data/acts/<id>.json files, and refreshes data/manifest.json so browsers load the new versions.
"""
import hashlib, json, os, sys

BASE = "bare-acts"
HIDE_GRADES = None          # None = use "hideGrades" from config.json (default ["C"])


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save(path, data, compact=False):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":") if compact else None, indent=None if compact else 1)
        f.write("\n")


def short_hash(path):
    return hashlib.sha1(open(path, "rb").read()).hexdigest()[:10]


def main(apply):
    cfg_path = os.path.join(BASE, "config.json")
    grades = HIDE_GRADES or (load(cfg_path).get("hideGrades") if os.path.exists(cfg_path) else None) or ["C"]
    grades = [g.upper() for g in grades]
    data = os.path.join(BASE, "data")
    cat_path = os.path.join(data, "catalogue.json")
    cat = load(cat_path)
    bad = [a for a in cat["acts"] if str(a.get("grade", "")).upper() in grades]
    print("Hidden grades: %s | Acts in catalogue: %d | Acts to remove: %d" % (", ".join(grades), len(cat["acts"]), len(bad)))
    for a in bad:
        print("  - %s (grade %s): %s" % (a["id"], a.get("grade"), a["name"]))
    if not bad:
        print("Nothing to remove.")
        return 0
    if not apply:
        print("\nReport only. Run again with --apply to remove them.")
        return 2
    ids = {a["id"] for a in bad}
    cat["acts"] = [a for a in cat["acts"] if a["id"] not in ids]
    still = {a["category"] for a in cat["acts"]}
    cat["categories"] = [c for c in cat.get("categories", []) if c in still]
    save(cat_path, cat)
    idx_path = os.path.join(data, "search-index.json")
    if os.path.exists(idx_path):
        idx = load(idx_path)
        gone = {i for i, row in enumerate(idx["acts"]) if row[0] in ids}
        idx["rows"] = [r for r in idx["rows"] if r[0] not in gone]
        save(idx_path, idx, compact=True)
    man_path = os.path.join(data, "manifest.json")
    man = load(man_path)
    for i in ids:
        rel = "data/acts/%s.json" % i
        full = os.path.join(BASE, rel)
        if os.path.exists(full):
            os.remove(full)
        man["files"].pop(rel, None)
    for rel in ("data/catalogue.json", "data/search-index.json"):
        if rel in man["files"] and os.path.exists(os.path.join(BASE, rel)):
            man["files"][rel] = short_hash(os.path.join(BASE, rel))
    save(man_path, man)
    print("Removed %d Act(s). Now upload the changed files in %s/data/." % (len(ids), BASE))
    return 0


if __name__ == "__main__":
    sys.exit(main("--apply" in sys.argv))
