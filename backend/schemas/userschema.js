const z = require('zod');

const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email({message:"Invalid email"}),
  password: z.string().min(8).regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),{message:'Must be a Valid Password'}), 
});

const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});


module.exports = {userRegistrationSchema,userLoginSchema}