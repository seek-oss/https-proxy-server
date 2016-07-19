#!/bin/sh

set -e

PRE_COMMIT=.git/hooks/pre-commit

cat > $PRE_COMMIT <<- EOM
#!/bin/sh

if [ "\$SKIP_LINT" != "true" ]; then
  npm run lint
fi

EOM

chmod +x $PRE_COMMIT
