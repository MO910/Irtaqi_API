const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const // user
    ShortUser_type = require("../Users/ShortUser"),
    Users_schema = require("../../../models/Users/Users"),
    // plan
    Plan_type = require("../Plans/Plan"),
    Plans_schema = require("../../../models/Plans/Plans");
// export Type
// User Type
module.exports = new GraphQLObjectType({
    name: "Subgroup",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        student_ids: { type: GraphQLID },
        plans: {
            type: new GraphQLList(Plan_type),
            async resolve({ id: subgroup_id }) {
                return await Plans_schema.find({
                    subgroup_id,
                });
            },
        },
        students: {
            type: new GraphQLList(ShortUser_type),
            async resolve({ student_ids }) {
                const students = await Promise.all(
                    student_ids.map(async (studentId) => {
                        return await Users_schema.findById(studentId);
                    })
                );
                return students;
            },
        },
    }),
});
