const COMMON = ['password', 'qwerty', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'sunshine', 'princess', 'football', 'charlie', 'abc123', 'iloveyou', 'admin'];

export const analysePassword = (pwd) => {
  const lower = pwd.toLowerCase();
  const rules = [
    { id: 'length8',  label: 'At least 8 characters',           pass: pwd.length >= 8 },
    { id: 'length12', label: 'At least 12 characters',          pass: pwd.length >= 12 },
    { id: 'upper',    label: 'Contains an uppercase letter',     pass: /[A-Z]/.test(pwd) },
    { id: 'lower',    label: 'Contains a lowercase letter',      pass: /[a-z]/.test(pwd) },
    { id: 'number',   label: 'Contains a number',                pass: /[0-9]/.test(pwd) },
    { id: 'symbol',   label: 'Contains a special character (!@#$…)', pass: /[^a-zA-Z0-9]/.test(pwd) },
    { id: 'noCommon', label: 'Not a commonly used password',     pass: !COMMON.some(w => lower.includes(w)) },
  ];

  const passed = rules.filter(r => r.pass).length;

  let strength = 0;
  if (passed >= 3) strength = 1; // Fair
  if (passed >= 5) strength = 2; // Medium
  if (passed >= 7) strength = 3; // Strong

  const meta = [
    { label: 'Weak',   color: '#ef4444', bg: '#fef2f2' },
    { label: 'Fair',   color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Medium', color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Strong', color: '#10b981', bg: '#f0fdf4' },
  ][strength];

  return { rules, strength, ...meta };
};
