import AppointmentRepository from '../database/repository/appointment-repository.js';

class AppointmentService {
	constructor() {
		this.repository = new AppointmentRepository();
	}

	async getAppointmentsByUserId(id) {
		return await this.repository.findAppointmentsByUserId(id);
	}

	async createAppointment(appointment) {
		const { 
			patientId,
			doctorId,
			patientName,
			doctorName,
			date,
			status,
			type,
			availableSlotsIdx,
			patientFamilyMember
		} = appointment;

		// deletes the available slot from the doctor's availableSlots array
		await this.repository.updateAvailableSlots(doctorId, availableSlotsIdx);
		
		const appointmentModelData = {
			patientId,
			doctorId,
			patientName,
			doctorName,
			date,
			status,
			type,
		};
		if(patientFamilyMember){
			appointmentModelData.patientFamilyMember = patientFamilyMember;
		}
		return await this.repository.createAppointment(appointmentModelData);
	}

	async updateAppointment(appointmentId, newDate){
		return await this.repository.updateAppointment(appointmentId, newDate);
	}
}

export default AppointmentService;
