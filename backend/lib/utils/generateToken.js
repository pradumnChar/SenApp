import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie=(userId, res)=>{
    const token = jwt.sign({userId},
        process.env.JWT_SECRET,{
            expiresIn: '15d'
        }
    )
    res.cookie('jwt', token,{//setting cookie name = jwt sends cookies in http
        maxAge: 15*24*60*60*1000,
        httpOnly: true, //prevent XSS attacks cross-site scripting attakcs ie means cannot bea ceesed through js of client site
        sameSite: "strict",//CSRF attacks cross ite req
        secure:process.env.NODE_ENV !== 'development',//omly be sent in esure env where node nev is deploment
    })
}