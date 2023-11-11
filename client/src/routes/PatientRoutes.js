import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import FamilyMembers from 'pages/family-member/FamilyMembers.js';
import { PATIENT_TYPE_ENUM } from 'utils/Constants';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyPrescriptions = Loadable(
    lazy(() => import('pages/prescriptions/Prescriptions'))
);
const LazyAdmins = Loadable(lazy(() => import('pages/Admins')));
const LazyPatients = Loadable(lazy(() => import('pages/Patients')));
const LazyDoctorListofPatients = Loadable(
    lazy(() => import('pages/DoctorListofPatients'))
);
const LazyDoctors = Loadable(lazy(() => import('pages/Doctors')));
const LazyDoctorRequests = Loadable(lazy(() => import('pages/DoctorRequests')));
const LazyPackages = Loadable(
    lazy(() => import('pages/HealthPackages/HealthPackage'))
);
const LazyWalletAmount=Loadable(lazy(() => import('pages/Wallet/WalletAmount')));

const LazyClinicDoctors = Loadable(lazy(() => import('pages/Doctors/Doctors')));
const LazyAppointments = Loadable(
    lazy(() => import('pages/Appointment/Appointment'))
);

const Account = Loadable(lazy(() => import('pages/profile/Account'))); //TODO: generalize this

// utilities routing
const UtilsTypography = Loadable(
    lazy(() => import('pages/utilities/Typography'))
);
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/patient',
    element: <MainLayout userType={PATIENT_TYPE_ENUM} />,
    children: [
        {
            path: 'patient',
            element: <DashboardDefault />,
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />,
                },
            ],
        },
        {
            path: 'pages',
            children: [
                {
                    path: 'profile',
                    element: <Account />,
                },
                {
                    path: 'admins',
                    element: <LazyAdmins />,
                },
                {
                    path: 'patients',
                    element: <LazyPatients />,
                },
                {
                    path: 'doctors',
                    element: <LazyDoctors />,
                },
                {
                    path: 'doctor-requests',
                    element: <LazyDoctorRequests />,
                },
                {
                    path: 'family-members',
                    element: <FamilyMembers />,
                },
                {
                    path: 'appointments',
                    element: <LazyAppointments />,
                },
                {
                    path: 'prescriptions',
                    element: <LazyPrescriptions />,
                },
                {
                    path: 'my-patients',
                    element: <LazyDoctorListofPatients />,
                },
                {
                    path: 'packages',
                    element: <LazyPackages />,
                },
                {
                    path: 'clinic',
                    children: [
                        {
                            path: 'doctors',
                            element: <LazyClinicDoctors />,
                        },
                    ],
                },
                

            ],

        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />,
                },
                {
                    path: 'util-color',
                    element: <UtilsColor />,
                },
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />,
                },
            ],
        },
        {
            path: 'sample-page',
            element: <SamplePage />,
        },
        {
            path: 'wallet',
            element: <LazyWalletAmount />,
        }
    ],
};

export default MainRoutes;
