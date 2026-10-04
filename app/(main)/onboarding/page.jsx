import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'
import { redirect } from 'next/navigation';
import { getUserOnboardingStatus } from '@/actions/user';
const onboardingPage = async () => {
 const {isOnboarded} = await getUserOnboardingStatus();

 if (isOnboarded) {
    redirect('/dashboard');
  } 
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default onboardingPage