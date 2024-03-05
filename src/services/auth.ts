import bcrypt from 'bcrypt'

export const hashedPassword = async (inputtedText: string) => {
    const saltRound = 12;
    return await bcrypt.hash(inputtedText, saltRound);
}

export const comparePasswords = async (inputtedText: string, hashedPassword: string) => {
    return await bcrypt.compare(inputtedText, hashedPassword);
}