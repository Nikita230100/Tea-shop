import { JSX } from 'react'
import { Navigate } from 'react-router'
import { ProtRoutProp } from './types/protectedRouteProp'

export default function ProtectedRoute({ 
  children, authUser, redirectTo 
}: ProtRoutProp): JSX.Element | JSX.Element[] {
  if (authUser) {
    return <Navigate to={redirectTo} replace />
  } else {
    return children
  }
}