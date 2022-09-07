const LogoutLink = () => {
    return (
        <div>
        <div className="btn btn-primary" onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            window.location.href = '/';
        }
        }>Logout</div>
        
        </div>
    );
    }
export default LogoutLink;