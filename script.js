const { data: sessionData } =
    await supabaseClient.auth.getSession();

const session = sessionData.session;

const { data: membership, error: clinicError } =
    await supabaseClient
        .from("clinic_members")
        .select("clinic_id")
        .eq("user_id", session.user.id)
        .single();

const { error } = await supabaseClient
    .from("patients")
    .insert({
        clinic_id: membership.clinic_id,
        name: patientName,
        species: species,
        breed: breed,
        sex: sex,
        date_of_birth: dateOfBirth || null,
        weight: weight || null,
        owner: ownerName,
        owner_phone: phone,
        owner_address: address
    });