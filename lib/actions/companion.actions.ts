'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"





export const createCompanion = async(formData:CreateCompanion)=>{


    const { userId,author } = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    const supabase = createSupabaseClient();

    const {data,error } = await supabase
        .from('companions')
        .insert({...formData, author})  // Add the userId to the insert data
        .select()

    if (error || !data ){
        throw new Error(error?.message || 'Failed to create companion')
    }

    return data[0];




}