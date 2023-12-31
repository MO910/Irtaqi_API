const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// const // user
const User_type = require("../Users/User");
const Users_schema = require("../../../models/Users/Users");
//     // plan
//     Plan_type = require("../Plans/Plan"),
//     Plans_schema = require("../../../models/Plans/Plans");
// export Type
// User Type
module.exports = new GraphQLObjectType({
	name: "Subgroup",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		student_ids: { type: new GraphQLList(GraphQLID) },
		students: {
			type: new GraphQLList(User_type),
			async resolve({ student_ids }) {
				const students = await Promise.all(
					student_ids.map(async (studentId) => {
						return await Users_schema.findById(studentId);
					}),
				);
				return students;
			},
		},
		// plans: {
		//     type: new GraphQLList(Plan_type),
		//     async resolve({ id: subgroup_id }) {
		//         return await Plans_schema.find({
		//             subgroup_id,
		//         });
		//     },
		// },
	}),
});
