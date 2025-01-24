import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar, { NavbarProps } from '../components/Navbar';
import { Card } from '../components/ui/card';

const ParentDashboard = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  if (loading || !session) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }

  const handleSignIn = () => {
    console.log('Sign in clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  const navbarProps: NavbarProps = {
    onSignIn: handleSignIn,
    onSignUp: handleSignUp
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar {...navbarProps} />
      
      <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-3">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <div className="space-y-2">
              <div className="p-2 hover:bg-gray-100 rounded">Child Selection</div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
            <div className="space-y-6">
              <div className="bg-gray-200 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Completed Lessons</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 p-4 rounded-lg">
                      Lesson {i}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Upcoming Lessons</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-2 bg-gray-50 rounded">
                      Upcoming Lesson {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-3">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="space-y-2">
              <div className="p-2 bg-red-50 text-red-600 rounded">Urgent</div>
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded">Warning</div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded">Info</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
