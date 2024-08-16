import axios from 'axios'
import { useState } from 'react'

const OTPGenerator = () => {
    const [phone, setPhone] = useState('')
    const [otp, setOTP] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [otpSent, setOtpSent] = useState(false)

    const handleSendOTP = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage('') // reset message

        try {

            const data = { 
                phone : phone
            }

        const response = await axios.get('/api/generateOTP', data)

        if (response.status === 200) {
            setMessage('OTP has been sent to your phone.')
            setOtpSent(true)
        } else {
            
            setMessage('Error while generating opt code')
        }
        } catch (error) {
        setMessage('An error occurred. Please try again.')
        console.error(error)
        } finally {
        setIsLoading(false)
        }
    }

    const handleVerifyOTP = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage('') // reset message

        try {

            const data = { phone : phone, otp : otp }
        const response = await axios.get('/api/verifyOTP', data)

        if (response.status === 200) {
            setMessage('OTP verification successful!')
            setOtpSent(false)
            setPhone('')
            setOTP('')
        } else {
            const data = await response.json()
            setMessage(data.error)
        }
        } catch (error) {
            setMessage('Error while generating opt code')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
        {!otpSent ? (
            <form onSubmit={handleSendOTP}>
            <label>
                Phone Number:
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
            </form>
        ) : (
            <form onSubmit={handleVerifyOTP}>
            <label>
                Enter OTP:
                <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
            </label>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            </form>
        )}
        {message && <p>{message}</p>}
        </div>
    )
}

export default OTPGenerator