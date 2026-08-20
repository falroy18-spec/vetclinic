// ========================================
// PATIENT FORM - ADD / EDIT
// ========================================

const patientForm = document.getElementById("patientForm");

if (patientForm) {

    const params = new URLSearchParams(window.location.search);
    const isEdit = params.get("edit") === "true";

    const editData = JSON.parse(
        localStorage.getItem("editPatient")
    );

    const pageTitle = document.getElementById("patientPageTitle");
    const pageDescription = document.getElementById("patientPageDescription");
    const saveButton = document.getElementById("savePatientButton");

    // ----------------------------------------
    // LOAD PATIENT DATA FOR EDIT
    // ----------------------------------------

    if (isEdit && editData) {

        pageTitle.textContent = "Edit Patient";

        pageDescription.textContent =
            "Update patient information.";

        saveButton.textContent = "Update Patient";

        document.getElementById("patientName").value =
            editData.name || "";

        document.getElementById("species").value =
            editData.species || "";

        document.getElementById("breed").value =
            editData.breed || "";

        document.getElementById("sex").value =
            editData.sex || "";

        document.getElementById("dateOfBirth").value =
            editData.dateOfBirth || "";

        document.getElementById("weight").value =
            editData.weight || "";

        document.getElementById("ownerName").value =
            editData.ownerName || "";

        document.getElementById("phone").value =
            editData.phone || "";

        document.getElementById("address").value =
            editData.address || "";
    }


    // ----------------------------------------
    // SAVE / UPDATE
    // ----------------------------------------

    patientForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const patients =
            JSON.parse(
                localStorage.getItem("patients")
            ) || [];


        if (isEdit && editData) {

            const index = patients.findIndex(function(patient) {

                return String(patient.id) ===
                    String(editData.id);

            });


            if (index !== -1) {

                patients[index] = {

                    id: editData.id,

                    name:
                        document.getElementById(
                            "patientName"
                        ).value,

                    species:
                        document.getElementById(
                            "species"
                        ).value,

                    breed:
                        document.getElementById(
                            "breed"
                        ).value,

                    sex:
                        document.getElementById(
                            "sex"
                        ).value,

                    dateOfBirth:
                        document.getElementById(
                            "dateOfBirth"
                        ).value,

                    weight:
                        document.getElementById(
                            "weight"
                        ).value,

                    ownerName:
                        document.getElementById(
                            "ownerName"
                        ).value,

                    phone:
                        document.getElementById(
                            "phone"
                        ).value,

                    address:
                        document.getElementById(
                            "address"
                        ).value

                };

            }


            localStorage.setItem(
                "patients",
                JSON.stringify(patients)
            );

            localStorage.removeItem("editPatient");

            window.location.href =
                "patient-detail.html?id=" +
                editData.id;

        }


        else {

            const patient = {

                id: Date.now(),

                name:
                    document.getElementById(
                        "patientName"
                    ).value,

                species:
                    document.getElementById(
                        "species"
                    ).value,

                breed:
                    document.getElementById(
                        "breed"
                    ).value,

                sex:
                    document.getElementById(
                        "sex"
                    ).value,

                dateOfBirth:
                    document.getElementById(
                        "dateOfBirth"
                    ).value,

                weight:
                    document.getElementById(
                        "weight"
                    ).value,

                ownerName:
                    document.getElementById(
                        "ownerName"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value,

                address:
                    document.getElementById(
                        "address"
                    ).value

            };


            patients.push(patient);

            localStorage.setItem(
                "patients",
                JSON.stringify(patients)
            );

            window.location.href =
                "patients.html";

        }

    });

}


// ========================================
// PATIENT LIST
// ========================================

const patientList =
    document.getElementById("patientList");

const patientSearch =
    document.getElementById("patientSearch");

const patients =
    JSON.parse(
        localStorage.getItem("patients")
    ) || [];


function displayPatients(list) {

    if (!patientList) return;

    patientList.innerHTML = "";


    if (list.length === 0) {

        patientList.innerHTML =
            "<p>No patients found.</p>";

        return;

    }


    list.forEach(function(patient) {

        const element =
            document.createElement("div");

        element.className =
            "appointment";


        element.innerHTML = `

            <div>

                <strong
                    style="cursor:pointer"
                    onclick="openPatient(${patient.id})"
                >
                    ${patient.name}
                </strong>

                <span>
                    ${patient.species}
                    •
                    ${patient.sex}
                    •
                    ${patient.weight || "-"} kg
                </span>

            </div>

            <div>
                Owner: ${patient.ownerName}
            </div>

            <div>
                Phone: ${patient.phone || "-"}
            </div>

        `;


        patientList.appendChild(element);

    });

}


if (patientList) {

    displayPatients(patients);

}


if (patientSearch) {

    patientSearch.addEventListener(
        "input",
        function() {

            const keyword =
                patientSearch.value
                    .toLowerCase()
                    .trim();


            const filteredPatients =
                patients.filter(function(patient) {

                    return (

                        patient.name
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        patient.ownerName
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        patient.species
                            .toLowerCase()
                            .includes(keyword)

                    );

                });


            displayPatients(filteredPatients);

        }
    );

}


// ========================================
// OPEN PATIENT
// ========================================

function openPatient(id) {

    window.location.href =
        "patient-detail.html?id=" + id;

}


// ========================================
// EDIT PATIENT
// ========================================

function editPatient() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const patientId =
        params.get("id");


    const patientsData =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    const patient =
        patientsData.find(function(patient) {

            return String(patient.id) ===
                String(patientId);

        });


    if (!patient) {

        alert("Patient not found.");

        return;

    }


    localStorage.setItem(
        "editPatient",
        JSON.stringify(patient)
    );


    window.location.href =
        "add-patient.html?edit=true";

}


// ========================================
// DELETE PATIENT
// ========================================

function deletePatient() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const patientId =
        params.get("id");


    const patientsData =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    const patient =
        patientsData.find(function(patient) {

            return String(patient.id) ===
                String(patientId);

        });


    if (!patient) {

        alert("Patient not found.");

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete " +
            patient.name +
            "?"
        );


    if (!confirmed) return;


    const updatedPatients =
        patientsData.filter(function(patient) {

            return String(patient.id) !==
                String(patientId);

        });


    localStorage.setItem(
        "patients",
        JSON.stringify(updatedPatients)
    );


    window.location.href =
        "patients.html";

}


// ========================================
// CREATE MEDICAL RECORD
// ========================================

function createMedicalRecord() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const patientId =
        params.get("id");


    const patientsData =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    const patient =
        patientsData.find(function(patient) {

            return String(patient.id) ===
                String(patientId);

        });


    if (!patient) {

        alert("Patient not found.");

        return;

    }


    localStorage.setItem(
        "selectedRecordPatient",
        patient.name
    );


    window.location.href =
        "add-medical-record.html";

}


// ========================================
// PATIENT DETAIL
// ========================================

const patientInformation =
    document.getElementById(
        "patientInformation"
    );


if (patientInformation) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const patientId =
        params.get("id");


    const patientsData =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    const patient =
        patientsData.find(function(patient) {

            return String(patient.id) ===
                String(patientId);

        });


    if (!patient) {

        patientInformation.innerHTML = `
            <p>Patient not found.</p>
        `;

    }

    else {

        const title =
            document.getElementById(
                "detailPatientName"
            );


        if (title) {

            title.textContent =
                patient.name;

        }


        patientInformation.innerHTML = `

            <div class="appointment">

                <div>
                    <strong>
                        Patient Name
                    </strong>

                    <span>
                        ${patient.name}
                    </span>
                </div>

                <div>
                    Species:
                    ${patient.species}
                </div>

                <div>
                    Breed:
                    ${patient.breed || "-"}
                </div>

                <div>
                    Sex:
                    ${patient.sex}
                </div>

                <div>
                    Date of Birth:
                    ${patient.dateOfBirth || "-"}
                </div>

                <div>
                    Weight:
                    ${patient.weight || "-"} kg
                </div>

                <hr>

                <div>
                    <strong>
                        Owner Information
                    </strong>
                </div>

                <div>
                    Name:
                    ${patient.ownerName}
                </div>

                <div>
                    Phone:
                    ${patient.phone || "-"}
                </div>

                <div>
                    Address:
                    ${patient.address || "-"}
                </div>

            </div>

        `;


        // ========================================
        // PATIENT APPOINTMENTS
        // ========================================

        const patientAppointments =
            document.getElementById(
                "patientAppointments"
            );


        if (patientAppointments) {

            const appointments =
                JSON.parse(
                    localStorage.getItem(
                        "appointments"
                    )
                ) || [];


            const data =
                appointments.filter(
                    function(appointment) {

                        return String(
                            appointment.patientId
                        ) === String(patient.id);

                    }
                );


            patientAppointments.innerHTML = "";


            if (data.length === 0) {

                patientAppointments.innerHTML =
                    "<p>No appointments found.</p>";

            }

            else {

                data.forEach(function(appointment) {

                    const element =
                        document.createElement("div");


                    element.className =
                        "appointment";


                    element.innerHTML = `

                        <div>

                            <strong>
                                ${appointment.date}
                            </strong>

                            <span>
                                ${appointment.time}
                            </span>

                        </div>

                        <div>
                            Veterinarian:
                            ${appointment.veterinarian || "-"}
                        </div>

                        <div>
                            Reason:
                            ${appointment.reason || "-"}
                        </div>

                        <div>
                            Status:
                            ${appointment.status}
                        </div>

                    `;


                    patientAppointments
                        .appendChild(element);

                });

            }

        }


        // ========================================
        // PATIENT MEDICAL RECORDS
        // ========================================

        const patientRecords =
            document.getElementById(
                "patientRecords"
            );


        if (patientRecords) {

            const records =
                JSON.parse(
                    localStorage.getItem(
                        "medicalRecords"
                    )
                ) || [];


            const data =
                records.filter(function(record) {

                    return record.patient &&
                        record.patient
                            .toLowerCase() ===
                        patient.name
                            .toLowerCase();

                });


            patientRecords.innerHTML = "";


            if (data.length === 0) {

                patientRecords.innerHTML =
                    "<p>No medical records found.</p>";

            }

            else {

                data.forEach(function(record) {

                    const element =
                        document.createElement("div");


                    element.className =
                        "appointment";


                    element.innerHTML = `

                        <div>

                            <strong>
                                Visit:
                                ${record.visitDate}
                            </strong>

                        </div>

                        <div>
                            Veterinarian:
                            ${record.veterinarian || "-"}
                        </div>

                        <div>
                            Diagnosis:
                            ${record.assessment || "-"}
                        </div>

                        <div>
                            Treatment:
                            ${record.plan || "-"}
                        </div>

                    `;


                    patientRecords
                        .appendChild(element);

                });

            }

        }


        // ========================================
        // PATIENT BILLING
        // ========================================

        const patientBilling =
            document.getElementById(
                "patientBilling"
            );


        if (patientBilling) {

            const invoices =
                JSON.parse(
                    localStorage.getItem(
                        "invoices"
                    )
                ) || [];


            const data =
                invoices.filter(function(invoice) {

                    return invoice.patient &&
                        invoice.patient
                            .toLowerCase() ===
                        patient.name
                            .toLowerCase();

                });


            patientBilling.innerHTML = "";


            if (data.length === 0) {

                patientBilling.innerHTML =
                    "<p>No invoices found.</p>";

            }

            else {

                data.forEach(function(invoice) {

                    const element =
                        document.createElement("div");


                    element.className =
                        "appointment";


                    element.innerHTML = `

                        <div>

                            <strong>
                                ${invoice.service}
                            </strong>

                            <span>
                                ${invoice.date}
                            </span>

                        </div>

                        <div>
                            Amount:
                            Rp ${Number(
                                invoice.amount
                            ).toLocaleString("id-ID")}
                        </div>

                        <div>
                            Status:
                            ${invoice.status}
                        </div>

                    `;


                    patientBilling
                        .appendChild(element);

                });

            }

        }

    }

}


// ========================================
// APPOINTMENT PATIENT DROPDOWN
// ========================================

const appointmentPatient =
    document.getElementById(
        "appointmentPatient"
    );


if (appointmentPatient) {

    const patientsData =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    patientsData.forEach(function(patient) {

        const option =
            document.createElement("option");


        option.value =
            patient.id;


        option.textContent =
            patient.name +
            " • " +
            patient.species;


        appointmentPatient
            .appendChild(option);

    });

}


// ========================================
// SAVE APPOINTMENT
// ========================================

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const appointment = {

                id: Date.now(),

                patientId:
                    document.getElementById(
                        "appointmentPatient"
                    ).value,

                date:
                    document.getElementById(
                        "appointmentDate"
                    ).value,

                time:
                    document.getElementById(
                        "appointmentTime"
                    ).value,

                veterinarian:
                    document.getElementById(
                        "appointmentVeterinarian"
                    ).value,

                reason:
                    document.getElementById(
                        "appointmentReason"
                    ).value,

                status:
                    document.getElementById(
                        "appointmentStatus"
                    ).value

            };


            const appointments =
                JSON.parse(
                    localStorage.getItem(
                        "appointments"
                    )
                ) || [];


            appointments.push(appointment);


            localStorage.setItem(
                "appointments",
                JSON.stringify(appointments)
            );


            window.location.href =
                "appointments.html";

        }
    );

}


// ========================================
// APPOINTMENT LIST
// ========================================

const appointmentList =
    document.getElementById(
        "appointmentList"
    );


if (appointmentList) {

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    const patientsData =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    appointmentList.innerHTML = "";


    if (appointments.length === 0) {

        appointmentList.innerHTML =
            "<p>No appointments yet.</p>";

    }

    else {

        appointments.forEach(function(appointment) {

            const patient =
                patientsData.find(
                    function(patient) {

                        return String(patient.id) ===
                            String(appointment.patientId);

                    }
                );


            const element =
                document.createElement("div");


            element.className =
                "appointment";


            element.innerHTML = `

                <div>

                    <strong>
                        ${
                            patient
                            ? patient.name
                            : "Unknown Patient"
                        }
                    </strong>

                    <span>
                        ${appointment.date}
                        •
                        ${appointment.time}
                    </span>

                </div>

                <div>
                    Veterinarian:
                    ${appointment.veterinarian || "-"}
                </div>

                <div>
                    Reason:
                    ${appointment.reason || "-"}
                </div>

                <div>
                    Status:
                    <strong>
                        ${appointment.status}
                    </strong>
                </div>

            `;


            appointmentList
                .appendChild(element);

        });

    }

}


// ========================================
// MEDICAL RECORD FORM
// ========================================

const recordForm =
    document.getElementById(
        "recordForm"
    );


if (recordForm) {

    const selectedPatient =
        localStorage.getItem(
            "selectedRecordPatient"
        );


    const patientInput =
        document.getElementById(
            "recordPatient"
        );


    if (
        selectedPatient &&
        patientInput
    ) {

        patientInput.value =
            selectedPatient;


        localStorage.removeItem(
            "selectedRecordPatient"
        );

    }


    recordForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const record = {

                id: Date.now(),

                visitDate:
                    document.getElementById(
                        "visitDate"
                    ).value,

                patient:
                    document.getElementById(
                        "recordPatient"
                    ).value,

                veterinarian:
                    document.getElementById(
                        "veterinarian"
                    ).value,

                subjective:
                    document.getElementById(
                        "subjective"
                    ).value,

                objective:
                    document.getElementById(
                        "objective"
                    ).value,

                assessment:
                    document.getElementById(
                        "assessment"
                    ).value,

                plan:
                    document.getElementById(
                        "plan"
                    ).value

            };


            const records =
                JSON.parse(
                    localStorage.getItem(
                        "medicalRecords"
                    )
                ) || [];


            records.push(record);


            localStorage.setItem(
                "medicalRecords",
                JSON.stringify(records)
            );


            window.location.href =
                "medical-records.html";

        }
    );

}


// ========================================
// MEDICAL RECORD LIST
// ========================================

const recordList =
    document.getElementById(
        "recordList"
    );


if (recordList) {

    const records =
        JSON.parse(
            localStorage.getItem(
                "medicalRecords"
            )
        ) || [];


    recordList.innerHTML = "";


    if (records.length === 0) {

        recordList.innerHTML =
            "<p>No medical records yet.</p>";

    }

    else {

        records.forEach(function(record) {

            const element =
                document.createElement("div");


            element.className =
                "appointment";


            element.innerHTML = `

                <div>

                    <strong>
                        ${record.patient}
                    </strong>

                    <span>
                        Visit:
                        ${record.visitDate}
                    </span>

                </div>

                <div>
                    Veterinarian:
                    ${record.veterinarian || "-"}
                </div>

                <div>
                    Diagnosis:
                    ${record.assessment || "-"}
                </div>

                <div>
                    Treatment:
                    ${record.plan || "-"}
                </div>

            `;


            recordList
                .appendChild(element);

        });

    }

}


// ========================================
// MEDICINES
// ========================================

const medicineForm =
    document.getElementById(
        "medicineForm"
    );


if (medicineForm) {

    medicineForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const medicine = {

                id: Date.now(),

                name:
                    document.getElementById(
                        "medicineName"
                    ).value,

                category:
                    document.getElementById(
                        "medicineCategory"
                    ).value,

                stock:
                    document.getElementById(
                        "medicineStock"
                    ).value,

                unit:
                    document.getElementById(
                        "medicineUnit"
                    ).value,

                expiry:
                    document.getElementById(
                        "medicineExpiry"
                    ).value

            };


            const medicines =
                JSON.parse(
                    localStorage.getItem(
                        "medicines"
                    )
                ) || [];


            medicines.push(medicine);


            localStorage.setItem(
                "medicines",
                JSON.stringify(medicines)
            );


            window.location.href =
                "medicines.html";

        }
    );

}


// ========================================
// MEDICINE LIST
// ========================================

const medicineList =
    document.getElementById(
        "medicineList"
    );


if (medicineList) {

    const medicines =
        JSON.parse(
            localStorage.getItem(
                "medicines"
            )
        ) || [];


    medicineList.innerHTML = "";


    if (medicines.length === 0) {

        medicineList.innerHTML =
            "<p>No medicines in inventory yet.</p>";

    }

    else {

        medicines.forEach(function(medicine) {

            const element =
                document.createElement("div");


            element.className =
                "appointment";


            element.innerHTML = `

                <div>

                    <strong>
                        ${medicine.name}
                    </strong>

                    <span>
                        ${medicine.category}
                    </span>

                </div>

                <div>
                    Stock:
                    ${medicine.stock}
                    ${medicine.unit}
                </div>

                <div>
                    Expiry:
                    ${medicine.expiry}
                </div>

            `;


            medicineList
                .appendChild(element);

        });

    }

}


// ========================================
// BILLING
// ========================================

const billingForm =
    document.getElementById(
        "billingForm"
    );


if (billingForm) {

    billingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const invoice = {

                id: Date.now(),

                patient:
                    document.getElementById(
                        "billingPatient"
                    ).value,

                date:
                    document.getElementById(
                        "billingDate"
                    ).value,

                service:
                    document.getElementById(
                        "billingService"
                    ).value,

                amount:
                    document.getElementById(
                        "billingAmount"
                    ).value,

                status:
                    document.getElementById(
                        "billingStatus"
                    ).value

            };


            const invoices =
                JSON.parse(
                    localStorage.getItem(
                        "invoices"
                    )
                ) || [];


            invoices.push(invoice);


            localStorage.setItem(
                "invoices",
                JSON.stringify(invoices)
            );


            window.location.href =
                "billing.html";

        }
    );

}


// ========================================
// BILLING LIST
// ========================================

const billingList =
    document.getElementById(
        "billingList"
    );


if (billingList) {

    const invoices =
        JSON.parse(
            localStorage.getItem(
                "invoices"
            )
        ) || [];


    billingList.innerHTML = "";


    if (invoices.length === 0) {

        billingList.innerHTML =
            "<p>No invoices yet.</p>";

    }

    else {

        invoices.forEach(function(invoice) {

            const element =
                document.createElement("div");


            element.className =
                "appointment";


            element.innerHTML = `

                <div>

                    <strong>
                        ${invoice.patient}
                    </strong>

                    <span>
                        ${invoice.date}
                    </span>

                </div>

                <div>
                    Service:
                    ${invoice.service}
                </div>

                <div>
                    Amount:
                    Rp ${Number(
                        invoice.amount
                    ).toLocaleString("id-ID")}
                </div>

                <div>
                    Status:
                    <strong>
                        ${invoice.status}
                    </strong>
                </div>

            `;


            billingList
                .appendChild(element);

        });

    }

}


// ========================================
// DASHBOARD
// ========================================

const totalPatients =
    document.getElementById(
        "totalPatients"
    );

const totalAppointments =
    document.getElementById(
        "totalAppointments"
    );

const totalRecords =
    document.getElementById(
        "totalRecords"
    );

const totalMedicines =
    document.getElementById(
        "totalMedicines"
    );


if (totalPatients) {

    const data =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];

    totalPatients.textContent =
        data.length;

}


if (totalAppointments) {

    const data =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];

    totalAppointments.textContent =
        data.length;

}


if (totalRecords) {

    const data =
        JSON.parse(
            localStorage.getItem("medicalRecords")
        ) || [];

    totalRecords.textContent =
        data.length;

}


if (totalMedicines) {

    const data =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];

    totalMedicines.textContent =
        data.length;

}


// ========================================
// REPORTS
// ========================================

const reportPatients =
    document.getElementById(
        "reportPatients"
    );

const reportAppointments =
    document.getElementById(
        "reportAppointments"
    );

const reportRecords =
    document.getElementById(
        "reportRecords"
    );

const reportMedicines =
    document.getElementById(
        "reportMedicines"
    );

const reportInvoices =
    document.getElementById(
        "reportInvoices"
    );


if (reportPatients) {

    const data =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];

    reportPatients.textContent =
        data.length;

}


if (reportAppointments) {

    const data =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];

    reportAppointments.textContent =
        data.length;

}


if (reportRecords) {

    const data =
        JSON.parse(
            localStorage.getItem("medicalRecords")
        ) || [];

    reportRecords.textContent =
        data.length;

}


if (reportMedicines) {

    const data =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];

    reportMedicines.textContent =
        data.length;

}


if (reportInvoices) {

    const data =
        JSON.parse(
            localStorage.getItem("invoices")
        ) || [];

    reportInvoices.textContent =
        data.length;

}