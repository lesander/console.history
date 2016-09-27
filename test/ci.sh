
# Run through JS Hint.
echo "[*] Running JS Hint on console-history.js"
./node_modules/jshint/bin/jshint ../console-history.js --multistr --ass --shadow

# Check for runtime errors.
echo "[*] Running console-history.js"
node ../console-history.js

echo "[*] Finished tests"
