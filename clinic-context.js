const SUPABASE_URL =
"https://zltbjbbofvndxirlipf.supabase.co";

const SUPABASE_KEY =
"sb_publishable_MWH4JPfiiJ2gvIqYpKE_Yw_UAoAlnFJ";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function getCurrentClinic(){

    const {
        data: {
            session
        },
        error: sessionError
    } =
    await supabaseClient.auth.getSession();


    if(sessionError){

        console.error(
            "Session error:",
            sessionError
        );

        return null;
    }


    if(!session){

        window.location.href =
            "login.html";

        return null;
    }


    const {
        data,
        error
    } =
    await supabaseClient
        .from("clinic_members")
        .select(`
            clinic_id,
            role,
            clinics (
                id,
                name
            )
        `)
        .eq(
            "user_id",
            session.user.id
        )
        .single();


    if(error){

        console.error(
            "Clinic lookup error:",
            error
        );

        return null;
    }


    if(!data || !data.clinics){

        console.error(
            "User belum terhubung ke klinik."
        );

        return null;
    }


    return {

        userId:
            session.user.id,

        clinicId:
            data.clinic_id,

        clinicName:
            data.clinics.name,

        role:
            data.role

    };
}