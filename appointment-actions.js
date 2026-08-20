function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) {
        return;
    }

    const appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];

    const updatedAppointments =
        appointments.filter(function(appointment) {

            return appointment.id !== id;

        });

    localStorage.setItem(
        "appointments",
        JSON.stringify(updatedAppointments)
    );

    window.location.reload();
}