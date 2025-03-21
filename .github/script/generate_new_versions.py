import json
import sys

def get_new_versions(old_file_path, new_file_path):
    with open(old_file_path, 'r', encoding='utf-8') as f:
        old_data = json.load(f)
    
    with open(new_file_path, 'r', encoding='utf-8') as f:
        new_data = json.load(f)
    
    old_versions = set(item['version'] for item in old_data)
    new_versions = set(item['version'] for item in new_data)
    added_versions = new_versions - old_versions
    
    return sorted(list(added_versions))


old_file = sys.argv[1]
new_file = sys.argv[2]

new_versions = get_new_versions(old_file, new_file)
if len(new_versions) > 0:
    print("add versions:", new_versions)
else:
    raise Exception("no new versions")