// ========================================
// SUPABASE
// ========================================

const SUPABASE_URL =
    "https://zltbjbbofvvndxirlipf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_MWH4JPfiiJ2gvIqYpKE_Yw_UAoAlnFJ";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// GET CURRENT CLINIC
// ========================================

async function getCurrentClinic() {

    const {
        data: {
            session
        },
        error: sessionError
    } =
        await supabaseClient.auth.getSession();


    if (sessionError) {

        console.error(
            "Session error:",
            sessionError
        );

        return null;
    }


    if (!session) {

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


    if (error) {

        console.error(
            "Clinic lookup error:",
            error
        );

        return null;
    }


    if (!data || !data.clinics) {

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


// ========================================
// PATIENT FORM
// ========================================

const patientForm =
    document.getElementById(
        "patientForm"
    );


if (patientForm) {

    patientForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const saveButton =
                document.getElementById(
                    "savePatientButton"
                );


            saveButton.disabled = true;

            saveButton.textContent =
                "Saving...";


            try {

                // ----------------------------
                // GET LOGIN SESSION
                // ----------------------------

                const {
                    data: {
                        session
                    },
                    error: sessionError
                } =
                    await supabaseClient.auth
                        .getSession();


                if (sessionError) {

                    throw sessionError;

                }


                if (!session) {

                    window.location.href =
                        "login.html";

                    return;

                }


                // ----------------------------
                // GET CLINIC
                // ----------------------------

                const {
                    data: membership,
                    error: clinicError
                } =
                    await supabaseClient
                        .from(
                            "clinic_members"
                        )
                        .select(
                            "clinic_id"
                        )
                        .eq(
                            "user_id",
                            session.user.id
                        )
                        .maybeSingle();


                if (clinicError) {

                    throw clinicError;

                }


                if (
                    !membership ||
                    !membership.clinic_id
                ) {

                    throw new Error(
                        "Akun belum terhubung ke klinik."
                    );

                }


                // ----------------------------
                // GET PATIENT DATA
                // ----------------------------

                const patientName =
                    document
                        .getElementById(
                            "patientName"
                        )
                        .value
                        .trim();


                const species =
                    document
                        .getElementById(
                            "species"
                        )
                        .value;


                const breed =
                    document
                        .getElementById(
                            "breed"
                        )
                        .value
                        .trim();


                const sex =
                    document
                        .getElementById(
                            "sex"
                        )
                        .value;


                const dateOfBirth =
                    document
                        .getElementById(
                            "dateOfBirth"
                        )
                        .value;


                const weight =
                    document
                        .getElementById(
                            "weight"
                        )
                        .value;


                const ownerName =
                    document
                        .getElementById(
                            "ownerName"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "phone"
                        )
                        .value
                        .trim();


                const address =
                    document
                        .getElementById(
                            "address"
                        )
                        .value
                        .trim();


                // ----------------------------
                // SAVE TO SUPABASE
                // ----------------------------

                const {
                    error
                } =
                    await supabaseClient
                        .from("patients")
                        .insert({

                            clinic_id:
                                membership.clinic_id,

                            name:
                                patientName,

                            species:
                                species,

                            breed:
                                breed ||
                                null,

                            sex:
                                sex,

                            date_of_birth:
                                dateOfBirth ||
                                null,

                            weight:
                                weight ?
                                Number(weight) :
                                null,

                            owner:
                                ownerName,

                            owner_phone:
                                phone ||
                                null,

                            owner_address:
                                address ||
                                null

                        });


                if (error) {

                    throw error;

                }


                // ----------------------------
                // SUCCESS
                // ----------------------------

                alert(
                    "Patient berhasil ditambahkan!"
                );


                window.location.href =
                    "patients.html";


            } catch (error) {

                console.error(
                    "Save patient error:",
                    error
                );


                alert(
                    "Gagal menyimpan patient:\n" +
                    error.message
                );


                saveButton.disabled =
                    false;

                saveButton.textContent =
                    "Save Patient";

            }

        }
    );

}


// ========================================
// PATIENT LIST
// ========================================

const patientList =
    document.getElementById(
        "patientList"
    );


async function loadPatients() {

    if (!patientList) {

        return;

    }


    patientList.innerHTML =
        "<p>Loading patients...</p>";


    const clinic =
        await getCurrentClinic();


    if (!clinic) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("patients")
            .select("*")
            .eq(
                "clinic_id",
                clinic.clinicId
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        patientList.innerHTML =
            "<p>Gagal memuat patient.</p>";

        return;

    }


    if (!data || data.length === 0) {

        patientList.innerHTML =
            "<p>No patients found.</p>";

        return;

    }


    patientList.innerHTML = "";


    data.forEach(
        function(patient) {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "appointment";


            element.innerHTML = `

                <div>

                    <strong>
                        ${patient.name}
                    </strong>

                    <span>
                        ${patient.species}
                        •
                        ${patient.sex}
                        •
                        ${patient.weight || "-"}
                        kg
                    </span>

                </div>

                <div>
                    Owner:
                    ${patient.owner || "-"}
                </div>

                <div>
                    Phone:
                    ${patient.owner_phone || "-"}
                </div>

            `;


            patientList.appendChild(
                element
            );

        }
    );

}


// ========================================
// LOAD PATIENTS
// ========================================

loadPatients();