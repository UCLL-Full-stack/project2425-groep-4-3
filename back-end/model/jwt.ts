import jwt from 'jsonwebtoken';


interface UserPayload {
    name: string;
    role: string;
}

const generateJwtToken = ({name, role}: UserPayload): string => {
    const options =  {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, 
        issuer: 'pedalenen_api',
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not defined.");
    }

    try {
        return jwt.sign({name,role}, secret, options);
    } catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token.")
    }
};

export {generateJwtToken}