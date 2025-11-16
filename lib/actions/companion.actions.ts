'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"
import { create } from "domain"





export const createCompanion = async(formData:CreateCompanion)=>{


    const { userId } = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    const supabase = createSupabaseClient();

    const {data,error } = await supabase
        .from('companions')
        .insert({...formData, userId})  // Add the userId to the insert data
        .select()

    if (error || !data ){
        throw new Error(error?.message || 'Failed to create companion')
    }

    return data[0];

}


export const deleteCompanion = async(companionId:string)=>{
    const supabase = createSupabaseClient();

    const userId = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    const {data,error} = await supabase
        .from('companions')
        .delete()
        .eq('id',companionId)
        .eq('userId',userId)



}



export const getAllCompanions = async({limit=10,page=1,subject,topic}:GetAllCompanions)=>{
    const supabase = createSupabaseClient();

    // Validate and sanitize pagination parameters
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100); // Max 100, min 1
    const safePage = Math.max(Number(page) || 1, 1); // Min 1

    let query = supabase.from('companions').select('*');

    // Sanitize and validate subject filter
    if(subject && typeof subject === 'string' && subject.trim() !== ''){
        const sanitizedSubject = subject.trim().replace(/['";\\\x00-\x1f]/g, '');
        if(sanitizedSubject) {
            query = query.ilike('subject', `%${sanitizedSubject}%`)
        }
    }

    // Sanitize and validate topic search
    if(topic && typeof topic === 'string' && topic.trim()!== ''){
        const sanitizedTopic = topic.trim()
            .replace(/['";\\\x00-\x1f]/g, '') // Remove dangerous characters
            .split(' ')
            .filter(word => word.length > 0 && word.length < 50) // Filter valid words
            .join(' & ');
        
        if(sanitizedTopic) {
            query = query.textSearch('topic', sanitizedTopic)
        }
    }

    
    


    // Apply pagination with validated parameters
    query = query.range((safePage-1)*safeLimit, safePage*safeLimit-1)


    const {data : companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;


}


export const getCompanion = async(id:string)=>{
    const supabase = createSupabaseClient();




    const {data,error} = await supabase
        .from('companions')
        .select('*')
        .eq('id',id)


    if (error) return console.log(error)
        
    
    
        else return data[0]


}