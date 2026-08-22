const { data: sessionData } =
    await supabaseClient.auth.getSession();

const session = sessionData.session;

if (!session) {
    alert("Session tidak ditemukan. Silakan login kembali.");
    return;
}

const { data: membership, error: clinicError } =
    await supabaseClient
        .from("clinic_members")
        .select("clinic_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

if (clinicError) {
    console.error("Clinic membership error:", clinicError);
    alert("Gagal mendapatkan klinik.");
    return;
}

if (!membership || !membership.clinic_id) {
    alert("Akun ini belum terhubung ke klinik.");
    return;
}

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

if (error) {
    console.error("Save patient error:", error);
    alert("Gagal menyimpan patient: " + error.message);
    return;
}

alert("Patient berhasil ditambahkan!");