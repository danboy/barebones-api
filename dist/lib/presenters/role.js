"use strict";
const { presentUser, presentUsers } = require("./user");
function presenter(oneOrMore) {
    return oneOrMore.map ? presentRoles(oneOrMore) : presentRole(oneOrMore);
}
function presentRole(role) {
    if (!role) {
        return {};
    }
    return {
        slug: role.slug,
        name: role.name,
        description: role.description,
        creator: role.actor ? presentUser(role.actor) : undefined,
        users: role.users ? presentUsers(role.users) : undefined,
    };
}
function presentRoles(roles) {
    return roles.map(r => {
        return presentRole(r);
    });
}
module.exports = { presentRole, presentRoles, presenter };
