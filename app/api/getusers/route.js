import { PrismaClient } from "@prisma/client";

 const prisma = new PrismaClient()
export async function GET(){
    try{
        const user = await prisma.user.findMany()
    return new Response(JSON.stringify(user),{ status: 200, headers: { 'Content-Type': 'application/json' }})
    }catch(error){
        return new Response({status : 500} , 'failed to get users')
    }
}