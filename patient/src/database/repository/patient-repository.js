import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import OrderModel from '../models/Order.js';
import {
    FAMILY_MEMBERS_PROJECTION,
    PATIENT_ADDRESSES_PROJECTION,
} from '../../utils/Constants.js';
import mongoose from 'mongoose';

class PatientRepository {
    async findAllPatients() {
        const allPatients = await PatientModel.find();
        return allPatients;
    }
    async findFamilyMembers(id) {
        console.log('id = ', id);
        const familyMembers = await PatientModel.findById(
            id,
            FAMILY_MEMBERS_PROJECTION
        );
        console.log('Family = ', familyMembers);
        return familyMembers;
    }

    async findPatientByUserName(userN) {
        return await PatientModel.findOne({ userName: userN });
    }

    async addFamilyMember(id, familyMembers) {
        return await PatientModel.findOneAndUpdate(
            { _id: id },
            { familyMembers },
            { new: true, runValidators: true }
        ).select(FAMILY_MEMBERS_PROJECTION);
    }

    async findAllPrescriptions() {
        const allPrescriptions = await PrescriptionModel.find();
        return allPrescriptions;
    }

    async findPrescriptionById(id) {
        const prescription = await PrescriptionModel.findById(id);
        return prescription;
    }

    async createPatient(patient) {
        const newPatient = await PatientModel.create(patient);
        return newPatient;
    }

    async deletePatient(id) {
        const deletedPatient = await PatientModel.findByIdAndDelete(id);
        return deletedPatient;
    }

    async signupUser(req) {
        const {
            name,
            email,
            password,
            userName,
            dateOfBirth,
            gender,
            mobileNumber,
            emergencyContact,
        } = req.body;
        const user = await PatientModel.signup(
            name,
            email,
            password,
            userName,
            dateOfBirth,
            gender,
            mobileNumber,
            emergencyContact
        );
        return user;
    }

    async findPatientAddresses(id) {
        const addresses = await PatientModel.findById(
            id,
            PATIENT_ADDRESSES_PROJECTION
        );
        addresses.deliveryAddresses.sort((a, b) => {
            return a.primary ? -1 : b.primary ? 1 : 0;
        });
        return addresses;
    }

    async updatePatientAddress(id, address){
        const addresses = await PatientModel.findOneAndUpdate(
            { _id: id },
            { deliveryAddresses : address },
            { new: true, runValidators: true }
        ).select(PATIENT_ADDRESSES_PROJECTION);
        addresses.deliveryAddresses.sort((a, b) => {
            return a.primary ? -1 : b.primary ? 1 : 0;
        });
        return addresses;
    }

    async findOrders(id) {
        const orders = await OrderModel.find({ patientId: id });
        return orders;
    }

    async addOrder(order) {
        const newOrder = await OrderModel.create(order);
        return newOrder;
    }

    async updateOrder(order) {
        const updatedOrder = await OrderModel.findOneAndUpdate(
            { _id: order._id },
            order,
            { new: true, runValidators: true }
        );
        return updatedOrder;
    }
}

export default PatientRepository;
