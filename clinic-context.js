const SUPABASE_URL =
    "https://zltbjbbofvndxirlipf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_MWH4JPfiiJ2gvIqYpKE_Yw_UAoAlnFJ";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storage: window.localStorage
            }
        }
    );


async function getCurrentClinic() {

    console.log(
        "Checking Supabase session..."
    );


    const {
        data,
        error
    } =
        await supabaseClient
            .auth
            .getSession();


    console.log(
        "Supabase session:",
        data?.session
    );


    if (error) {

        console.error(
            "Session error:",
            error
        );

        return null;
    }


    /*
     * JANGAN REDIRECT KE LOGIN DI SINI.
     *
     * Kalau session tidak terbaca,
     * kita biarkan halaman tetap terbuka
     * supaya bisa melihat masalah sebenarnya.
     */

    if (!data?.session) {

        console.error(
            "NO ACTIVE SUPABASE SESSION"
        );

        return null;
    }


    const session =
        data.session;


    console.log(
        "Logged in user:",
        session.user.id
    );


    /*
     * Ambil clinic user
     */

    const {
        data: membership,
        error: membershipError
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
            .maybeSingle();


    if (membershipError) {

        console.error(
            "Clinic lookup error:",
            membershipError
        );

        return null;
    }


    if (
        !membership ||
        !membership.clinics
    ) {

        console.error(
            "USER BELUM TERHUBUNG KE CLINIC"
        );

        return null;
    }


    console.log(
        "Current clinic:",
        membership.clinics.name
    );


    return {

        userId:
            session.user.id,

        clinicId:
            membership.clinic_id,

        clinicName:
            membership.clinics.name,

        role:
            membership.role

    };

}