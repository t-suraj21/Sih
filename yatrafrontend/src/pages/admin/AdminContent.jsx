import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Edit, Trash2, Eye, Search, Filter,
  Image, Video, MapPin, Calendar, User, Building
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminContent = () => {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Mock data
      setContent([
        {
          id: 1,
          title: 'Top 10 Destinations in India',
          type: 'article',
          status: 'published',
          author: 'Admin',
          publishDate: '2024-01-15',
          views: 1250,
          category: 'destinations'
        },
        {
          id: 2,
          title: 'Goa Beach Resort',
          type: 'destination',
          status: 'published',
          author: 'System',
          publishDate: '2024-01-10',
          views: 850,
          category: 'destinations'
        }
      ]);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600 mt-1">Manage platform content and destinations</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Content
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Content Management</h3>
            <p className="text-gray-600">Advanced content management features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
