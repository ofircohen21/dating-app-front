import React, { useEffect, useState } from "react";
import NavigationFooter from "../NavigationFooter/NavigationFooter";
import classes from './ProfilePage.module.css'
import EditProfile from "../EditProfile/EditProfile";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../HomePage/Modal/Modal";
import { deleteUser, getUser, updateUser } from "../../services/api-services/usersService";

const ProfilePage = ({ userId, onLogout, onDeleteAccount }) => {
    const [data, setData] = useState({})
    const [isEditMode, setIsEditMode] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isDeleteAccuountModalOpen, setIsDeleteAccountModalOpen] = useState(false)

    const getData = async (userId) => {
        if (userId) {
            try {
                const userData = await getUser(userId)
                delete userData.id
                setData(userData)

            } catch (error) {
                setErrorMessage(error.message)
            }
        }
    };

    useEffect(() => {
        getData(userId)
    }, [userId])


    const inputFields = Object.keys(data).map((fieldName => (
        (fieldName !== 'password' && <div key={fieldName} className={classes['field-container']}>
            <div>{fieldName.toUpperCase()}</div>
            <div className={classes['field-value']}>{data[fieldName]}</div>
        </div>)
    )))

    const handleLogout = () => {
        onLogout()
    }

    const updateUserData = async (newData) => {
        try {
            await updateUser(userId, newData)
            setData(newData)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const handleProfileUpdate = async (newData) => {
        await updateUserData(newData)
        closeEditMode()
    }

    const editClickHandler = () => {
        setIsEditMode(true)
    }

    const closeEditMode = () => {
        setIsEditMode(false)
    }

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(userId)
            onDeleteAccount()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const toggleDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(prevState => !prevState)
    }

    const handleDeleteAccountClick = () => {
        toggleDeleteAccountModal()
        handleDeleteAccount()
        localStorage.removeItem('user')
    }

    return (
        isEditMode ? <EditProfile userData={data} onEditClose={closeEditMode} onSubmit={handleProfileUpdate} /> :
            (<div className={classes['profile-container']}>
                <h2 className={classes.title}>Profile</h2>
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <div className={classes['user-details-container']}>
                    <div className={classes['edit-button']} onClick={editClickHandler}>Edit</div>
                    {inputFields}
                </div>
                {isDeleteAccuountModalOpen &&
                    <>
                        <div className={classes.background} onClick={toggleDeleteAccountModal} ></div>
                        <Modal className={classes['delete-account-modal']}>
                            <p className={classes['delete-account-message']}>Are you sure you want to delete your account?</p>
                            <div className={classes['modal-buttons-container']}>
                                <div className={classes['modal-button']} onClick={toggleDeleteAccountModal} >Cancel</div>
                                <div className={classes['modal-button']} onClick={handleDeleteAccountClick} >Delete</div>
                            </div>
                        </Modal>

                    </>}
                <div className={classes['actions-container']}>
                    <div className={classes['action']} onClick={handleLogout}>Logout</div>
                    <div className={`${classes['action']} ${classes['delete-account']}`} onClick={toggleDeleteAccountModal}>Delete Account</div>
                </div>
                <NavigationFooter />
            </div>)
    )
}

export default ProfilePage;