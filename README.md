[![Build Status](https://travis-ci.org/CodeSpaceHQ/caffeine-routine-galileo.svg?branch=master)](https://travis-ci.org/CodeSpaceHQ/caffeine-routine-galileo) [![Coverage Status](https://coveralls.io/repos/github/CodeSpaceHQ/caffeine-routine-galileo/badge.svg?branch=master)](https://coveralls.io/github/CodeSpaceHQ/caffeine-routine-galileo?branch=master)
# caffeine-routine-galileo
Intel Galileo project for Caffeine Routine

# Endpoints
## `/heat`
Verb: POST  
Description: Tells the Keurig to heat up.

## `/brew`
Verb: POST  
Description: Tell the Keurig to start brewing.  
Body:
``` javascript
{
  size: 'SIZE'
}
```
Size can be:
- small
- medium
- large
