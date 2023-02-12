import Image from "next/image"
import styles from './GoogleLogin.module.css'
import google_icon from '@/assets/google_icon.png'
import { useAuth } from "../Firebase/Auth"
import { useRouter } from "next/router"

export default function GoogleLogin() {
  const router = useRouter()
  const { login } = useAuth();

  return(
    <div className={styles.google_login_button} onClick={() => {
      login().then(() => {
        router.push("/dashboard")
      });
    }}>
      <Image src={google_icon} alt="Google Logo" width={25} className={styles.google_icon}></Image>
      <div>Sign in</div>
    </div>
  )
}