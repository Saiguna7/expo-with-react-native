
import { Redirect } from 'expo-router';
import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite'
export const Config={
    endpoint:"https://cloud.appwrite.io/v1",
    platform:"com.saiguna.aora",
    projectId:"6686937500108ada8aa2",
    databaseId:"668694af00038ceb7ed1",
    userCollectionId:"668694ee003074fa650e",
    videoCollectionId:"6686950e003620268bcb",
    storageId:"668696190014d9fe4a5d"
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
}=Config
const client =new Client();

client.setEndpoint(Config.endpoint)
.setProject(Config.projectId)
.setPlatform(Config.platform);

const account=new Account(client)
const avatars=new Avatars(client);
const databases=new Databases(client)
type Props={
    email:string
    password:string
    username:string
}
export const createUser=async ({email,password,username}:Props)=>{
   try{
      const newAccount =await account.create(
        ID.unique(),
        email,
        password,
        username
      )
      if(!newAccount) throw Error;
      const avatarUrl=avatars.getInitials(username)
      await signIn({email,password})
      const newUSer=await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId:newAccount.$id  ,
        email,
        username,
        avatar:avatarUrl
      }
      )
   }catch(error){
    console.log(error)
    throw new Error(error as string);
   }
}
type SignInPops={
    email:string
    password:string
}
export const signIn=async ({email,password}:SignInPops)=> {
    try{
        const sessions=await account.createEmailPasswordSession(email,password)

    }catch(error){
        console.log(error)
        throw new Error(error ) 
    }
}


export const getCurrentUser=async()=>{
    try{
        const currentAccount=await account.get();
        if(!currentAccount) throw Error;
        
        const currentuser=await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        if(!currentuser) throw Error
        return currentuser.documents[0]
    }catch(error){
        console.log(error)
    }
}

export const getAllPosts=async()=>{
    try{
        const posts=await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents;
    }catch(error){
        console.log(error)
        throw new Error(error )
    }
}

export const getLatestPosts=async()=>{
    try{
        const posts=await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    }catch(error){
        console.log(error)
        throw new Error(error as string)
    }
}

export const searchPosts=async(query:any)=>{
    try{
        const posts=await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)]
        )
        return posts.documents;
    }catch(error){
        console.log(error)
        throw new Error(error )
    }
}

export const getUserPosts=async(userId:string)=>{
    try{
        const posts=await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId)]
        )
        return posts.documents;
    }catch(error){
            throw new Error(error )
    }
}

export const signOut=async()=>{

    try{
const session=await account.deleteSession
('current')
return session
    }catch(error){
throw new Error(error )
    }
}