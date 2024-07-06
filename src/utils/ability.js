import { AbilityBuilder } from '@casl/ability';

/**
 * ***temporary permission
 * @param {object} user
 */
export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder();
  if (!user || !user.role) return [];

  if (user.role.toLowerCase() === 'admin') {
    can('manage', 'all');
  }
  if (user.role.toLowerCase() === 'viewer') {
    can('view', 'Dashboard');
  }
  return rules;
}

export function updateRules(user, ability) {
  const rules = defineRulesFor(user);
  ability.update(rules);
}
