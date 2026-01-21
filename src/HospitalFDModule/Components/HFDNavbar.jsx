import useHospitalFrontDeskAuthStore from '../../store/useHospitalFrontDeskAuthStore'
import FDNavbar from '../../FrontDeskModule/Components/FDNavbar'

export default function HFDNavbar() {
  return <FDNavbar useAuthStore={useHospitalFrontDeskAuthStore} />
}
