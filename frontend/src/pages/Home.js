import Header from '../components/header'
import LoginButton from '../components/login_button'

export default function Home(){
    return(
        <>
        <Header/>
        <div class="center">
            <h2>Welcome to GoHelpMe</h2>
        </div>
        <div class="center">
            <LoginButton />
        </div>
        

    </>
    )

}