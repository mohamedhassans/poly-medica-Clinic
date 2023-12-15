import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import { Typography } from '@mui/material';
import AvailableSlotsList from './AvailableSlotsList.js';
import Swal from 'sweetalert2';
import '../../../assets/css/swalStyle.css';

const FollowUp = ({ selectedAppointment }) => {
    console.log('selectedAppointment', selectedAppointment);
    const [doctorAvailableSlots, setDoctorAvailableSlots] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        clinicAxios
            .get(`/doctor/${selectedAppointment.doctorId}`)
            .then((res) => {
                setDoctorAvailableSlots(res.data.doctor.availableSlots);
                setIsLoading(false);
            })
            .catch((error) => {
				console.log(error);
			});
    }
    , []);
    const handleFollowUpRequest = async (availableSlotsIdx) => {
        console.log('availableSlotsIdx', availableSlotsIdx);
        // call your backend here the same way in AppointmentReschedule 
        // ( which is still in progress )
        const appointmentData = {
            patientId: selectedAppointment.patientId,
            doctorId: selectedAppointment.doctorId,
            patientName: selectedAppointment.patientName,
            doctorName: selectedAppointment.doctorName,
            date: doctorAvailableSlots[availableSlotsIdx].from,
            status: 'Incomplete',
            type: 'follow-up',
            availableSlotsIdx: availableSlotsIdx,
            patientFamilyMember: selectedAppointment.patientFamilyMember,
        };
        await clinicAxios
            .post('/appointments/follow-up-requests', appointmentData)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your request has been sent successfully!',
                })
                .then(() => {
                    // navigate to follow-up requests page
                });
            });

    };
    const handleConfirmation = (event) => {
        if(selectedAppointment.status.toUpperCase() != 'COMPLETE'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You cannot request a follow-up for an incomplete appointment!',
            });
            return;
        }
        const availableSlotsIdx = parseInt(event.target.id);
        Swal.fire({
			title: 'Confirm Request',
			text: 'Are you sure you want to request this follow-up appointment?',
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then(async (result) => {
			if (result['isConfirmed']) {
				await handleFollowUpRequest(availableSlotsIdx);
			}
		});
    };
    return (
        <>   
            {
                isLoading 
                &&
                <Typography>Loading...</Typography>
            }
            {
                !isLoading
                &&
                doctorAvailableSlots.length != 0
                &&
                <>
                    <AvailableSlotsList
                        availableSlots={doctorAvailableSlots}
                        textOnButton='Request Now'
                        handleClick={handleConfirmation}
                    />
                </>
            }
            {
                !isLoading
                &&
                !doctorAvailableSlots.length
                &&
                <Typography>There are currently no available slots</Typography>
            }
        </>
    );
};

export default FollowUp;