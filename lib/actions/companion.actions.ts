'use server'
import { auth } from "@clerk/nextjs/server"

import { create } from "domain"
import { revalidatePath } from "next/cache"
import { createSupabaseClient } from "../supabase"
import { createSearchParamsFromClient } from "next/dist/server/request/search-params"





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


export const addToSessionHistory = async(companionId:string)=>{
    
    const {userId} = await auth()
    const supabase = createSupabaseClient();


    if(!userId){
        throw new Error('User not authenticated')
        
    }

    const {data,error} = await supabase
        .from('session_history')
        .insert({companion_id:companionId, user_id:userId})

    if(error){
        throw new Error(error.message)
    } else{
        return data
    }
    
}






export const getRecentSessions = async(limit=10)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase   
        .from('session_history')
        .select(`companions:companion_id(*)`)
        .order('created_at', {ascending:false})
        .limit(limit)

    
    
    if(error){
        throw new Error(error.message)
    } else{
        return data.map(({companions})=>companions)
    }
        


        
}

export const getUserSessions = async(userId:string,limit=10)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase   
        .from('session_history')
        .select(`companions:companion_id(*)`)
        .eq('user_id',userId)
        .order('created_at', {ascending:false})
        .limit(limit)

    
    
    if(error){
        throw new Error(error.message)
    } else{
        return data.map(({companions})=>companions)
    }
        


        
}

export const getUserCompanions = async(userId:string)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase   
        .from('companions')
        .select()
        .eq('author',userId)

    
    
    if(error){
        throw new Error(error.message)
    } else{
        return data;
    }
        


        
}

export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page

  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};


export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  // We don't need the bookmarks data, so we return only the companions
  return data.map(({ companions }) => companions);
};


export const newCompanionPermissions = async()=>{
    const {userId,has} = await auth()

    const supabase = createSupabaseClient()

    let limit = 0;
    if(has({plan:'pro'})){
        return true
    } else if (has({feature:'3_companion_limit'})){
        limit = 3
    
    } else if(has({feature:'10_companion_limit'})){
        limit=3;
    }

    const {data,error} = await supabase
        .from('companions')
        .select('id',{count:'exact'})
        .eq('author',userId)

        if(error) {
            throw new Error(error.message)
        } else {
            const companionCount = data?.length;

            if(companionCount >= limit){
                return false;
            } else{
                return true;
            }
            

        }
        
        
        
        
        

    
}