
// Class For Data Validation
export default class Validation{
    // Method to allow access for certain User positions nad validate active session
    static async VerifyUserPrivilege(SessionCurrentUser, UsersAllowed = [], res) {
        if( SessionCurrentUser !== null){
            if (SessionCurrentUser.position in UsersAllowed ) {  // Search current User Position into desired allowed positions
                return true;
            }else{
                // User Without priviledge
                res.status(403).json({ message: "Acceso denegado" });
                return false;
            }
        }else{
            // User without session
            res.status(403).json({ message: "Acceso denegado" });
            return false;
        }
    }
}