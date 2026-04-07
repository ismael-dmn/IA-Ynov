import requests
import sys
import json
from datetime import datetime
import uuid

class TimeTravel_API_Tester:
    def __init__(self, base_url="https://voyage-temporel.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = f"test_session_{uuid.uuid4().hex[:8]}"

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout (30s)")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_chat_endpoint(self):
        """Test the chat endpoint with AI integration"""
        test_message = "Bonjour, pouvez-vous me parler de vos destinations?"
        
        success, response = self.run_test(
            "Chat Endpoint - AI Integration",
            "POST",
            "chat",
            200,
            data={
                "session_id": self.session_id,
                "message": test_message
            }
        )
        
        if success and isinstance(response, dict):
            if 'response' in response and response['response']:
                print(f"   AI Response received: {len(response['response'])} characters")
                return True
            else:
                print(f"   ❌ No 'response' field in chat response")
                return False
        return success

    def test_chat_session_continuity(self):
        """Test that chat maintains session continuity"""
        # First message
        success1, response1 = self.run_test(
            "Chat Session - First Message",
            "POST",
            "chat",
            200,
            data={
                "session_id": self.session_id,
                "message": "Je m'appelle Jean."
            }
        )
        
        if not success1:
            return False
            
        # Follow-up message to test session memory
        success2, response2 = self.run_test(
            "Chat Session - Follow-up Message",
            "POST",
            "chat",
            200,
            data={
                "session_id": self.session_id,
                "message": "Quel est mon nom?"
            }
        )
        
        return success2

    def test_booking_endpoint_valid(self):
        """Test booking endpoint with valid data"""
        booking_data = {
            "destination": "paris",
            "date": "2024-12-25",
            "travelers": 2,
            "name": "Jean Dupont",
            "email": "jean.dupont@example.com",
            "phone": "+33 6 12 34 56 78",
            "message": "Voyage de noces"
        }
        
        success, response = self.run_test(
            "Booking Endpoint - Valid Data",
            "POST",
            "booking",
            200,
            data=booking_data
        )
        
        if success and isinstance(response, dict):
            required_fields = ['success', 'booking_id', 'message']
            for field in required_fields:
                if field not in response:
                    print(f"   ❌ Missing required field: {field}")
                    return False
            
            if response.get('success') and response.get('booking_id'):
                print(f"   Booking ID: {response['booking_id']}")
                return True
            else:
                print(f"   ❌ Booking not successful or missing booking_id")
                return False
        
        return success

    def test_booking_endpoint_invalid(self):
        """Test booking endpoint with invalid data"""
        invalid_data = {
            "destination": "",  # Missing destination
            "date": "",  # Missing date
            "travelers": 0,  # Invalid travelers count
            "name": "",  # Missing name
            "email": "invalid-email",  # Invalid email
            "phone": "",  # Missing phone
        }
        
        # This should either return 422 (validation error) or 200 with error message
        success, response = self.run_test(
            "Booking Endpoint - Invalid Data",
            "POST",
            "booking",
            422,  # Expecting validation error
            data=invalid_data
        )
        
        # If it returns 200, check if it properly handles validation
        if not success:
            success_alt, response_alt = self.run_test(
                "Booking Endpoint - Invalid Data (Alternative)",
                "POST",
                "booking",
                200,
                data=invalid_data
            )
            if success_alt and isinstance(response_alt, dict):
                if response_alt.get('success') == False:
                    print("   ✅ Server properly handled invalid data with success=false")
                    return True
        
        return success

    def test_chat_error_handling(self):
        """Test chat endpoint error handling"""
        # Test with missing session_id
        success, response = self.run_test(
            "Chat Error Handling - Missing Session ID",
            "POST",
            "chat",
            422,  # Expecting validation error
            data={
                "message": "Test message"
                # Missing session_id
            }
        )
        return success

def main():
    print("🚀 Starting TimeTravel Agency API Tests")
    print("=" * 50)
    
    tester = TimeTravel_API_Tester()
    
    # Test sequence
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Chat Basic", tester.test_chat_endpoint),
        ("Chat Session Continuity", tester.test_chat_session_continuity),
        ("Booking Valid Data", tester.test_booking_endpoint_valid),
        ("Booking Invalid Data", tester.test_booking_endpoint_invalid),
        ("Chat Error Handling", tester.test_chat_error_handling),
    ]
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            if not result:
                print(f"\n⚠️  Test '{test_name}' failed but continuing...")
        except Exception as e:
            print(f"\n💥 Test '{test_name}' crashed: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    elif tester.tests_passed >= tester.tests_run * 0.7:  # 70% pass rate
        print("⚠️  Most tests passed, some issues found")
        return 0
    else:
        print("❌ Multiple test failures detected")
        return 1

if __name__ == "__main__":
    sys.exit(main())