
export const isAuthenticated = () => {
    const token = localStorage.getItem('Admtoken')
    if (!token) return false;
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        const expTime = decodedToken.exp;
        if (!expTime) {
            console.error('Invalid token expiration time');
            localStorage.removeItem('Admtoken');
            return false;
        }

        const currentTime = Date.now() / 1000;
        const timeDiffInSeconds = expTime - currentTime;

        if (timeDiffInSeconds <= 0) {
            localStorage.removeItem('Admtoken');
            return false;
        }

        const mins = timeDiffInSeconds / 60;
        const hrs = timeDiffInSeconds / 3600;
        const days = timeDiffInSeconds / (3600 * 24);
        const months = timeDiffInSeconds / (3600 * 24 * 30);
        const years = timeDiffInSeconds / (3600 * 24 * 365);

        console.log(`Token expires in:
          ${years.toFixed(2)} yrs,${months.toFixed(2)} mths,${days.toFixed(2)} days,${hrs.toFixed(2)} hrs,${mins.toFixed(2)} mins,${timeDiffInSeconds.toFixed(2)} secs`);

        return true;
    } catch (error) {
        localStorage.removeItem('Admtoken');
        return false;
    }
};