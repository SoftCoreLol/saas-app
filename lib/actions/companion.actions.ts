'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"





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





export const getAllCompanions = async({limit=10,page=1,subject,topic}:GetAllCompanions)=>{
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select('*');

    if(subject && subject.trim() !== ''){
        query = query.ilike('subject', `%${subject}%`)
    }

    if(topic && topic.trim()!== ''){
        const formattedTopic = topic.trim().split(' ').join(' & ');
        query = query.textSearch('topic', formattedTopic)
    }

    
    


    query = query.range((page-1)*limit,page*limit-1)


    const {data : companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;


}