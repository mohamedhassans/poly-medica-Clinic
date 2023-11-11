import React, { useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext.js';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import AdminRow from './AdminRow';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import AddAdminDialog from './AddAdminDialog';
import { authenticationAxios, clinicAxios } from '../utils/AxiosConfig';

const Admins = () => {
	const [admins, setAdmins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [newAdminUsername, setNewAdminUsername] = useState('');
	const [newAdminPassword, setNewAdminPassword] = useState('');
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [adminToDelete, setAdminToDelete] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');
	const { user } = useUserContext();

	useEffect(() => {
		clinicAxios.get('/admins')
			.then((data) => {
				setAdmins(
					data.admins.filter((admin) => admin.userName !== user.userName),
				);
				setIsLoading(false);
			})
			.catch(() => {
				errorMessage('Error fetching admins data');
				setIsLoading(false);
			});
	}, []);

	const handleRemoveAdmin = (adminId) => {
		setAdminToDelete(adminId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		// Check if the admin being deleted is a main admin
		const adminToBeDeleted = admins.find(
			(admin) => admin._id === adminToDelete,
		);
		if (adminToBeDeleted && adminToBeDeleted.mainAdmin) {
			// If it's a main admin, prevent deletion and show a message
			setConfirmDeleteDialogOpen(false);
			return;
		}

		clinicAxios.delete(`/admins/${adminToDelete}`)
			.then(() =>
				setAdmins((prevAdmins) =>
					prevAdmins.filter((admin) => admin._id !== adminToDelete),
				),
			)
			.catch(() => {
				errorMessage('Error deleting admin');
			})
			.finally(() => {
				setAdminToDelete(null);
				setConfirmDeleteDialogOpen(false);
			});

			//TODO: delete from user auth
	};

	const handleCancelDelete = () => {
		setAdminToDelete(null);
		setConfirmDeleteDialogOpen(false);
	};

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};

	const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
		setNewAdminUsername('');
		setNewAdminPassword('');
		setErrorMessage('');
	};

	const handleAddAdmin = async () => {
		const newAdmin = {
			userName: newAdminUsername,
			password: newAdminPassword,
		};

		if (!newAdminUsername || !newAdminPassword) {
			return;
		}

		// Make a POST request to add a new admin
		//TODO: these conditions 
		const response = await authenticationAxios.post('/admins/clinic', JSON.stringify(newAdmin), {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		if(response.status == 200){
				setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
				setOpenAddDialog(false);
				setNewAdminUsername('');
				setNewAdminPassword('');
				setErrorMessage('');
			}
			else
				setErrorMessage(
					response.response.data.message
				);
			
	};

	const isAddButtonDisabled = !newAdminUsername || !newAdminPassword;

	return (
		<MainCard title='Admins'>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Username</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(admins) &&
									admins.map((admin) => (
										<AdminRow
											key={admin._id}
											admin={admin}
											handleRemoveAdmin={handleRemoveAdmin}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						variant='contained'
						color='primary'
						onClick={handleOpenAddDialog}
						style={{
							position: 'fixed',
							bottom: '20px',
							right: '50px',
						}}
					>
						<AddIcon />
						Add Admin
					</Button>

					<AddAdminDialog
						openAddDialog={openAddDialog}
						handleCloseAddDialog={handleCloseAddDialog}
						newAdminUsername={newAdminUsername}
						newAdminPassword={newAdminPassword}
						setNewAdminUsername={setNewAdminUsername}
						setNewAdminPassword={setNewAdminPassword}
						handleAddAdmin={handleAddAdmin}
						isAddButtonDisabled={isAddButtonDisabled}
						errorMessage={errorMessage}
					/>

					{/* Confirmation Dialog for Delete */}
					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this admin?'
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Admins;
