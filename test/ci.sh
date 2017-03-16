#/usr/bin/env/sh
set -e

# Run through JS Hint.
echo "[*] Running StandardJS on console-history.js"
standard console-history.js

# Check for runtime errors.
echo "[*] Running console-history.js"
node console-history.js

echo "[*] Finished tests"
