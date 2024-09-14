import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Upload } from 'lucide-react';
import axios from 'axios';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<string>('create');
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    image: null as File | null | undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNftData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      setNftData((prevState) => ({
        ...prevState,
        image: e?.target?.files?.[0],
      }));
    }
  };

  const uploadImageToPinata = async (file: File) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          pinata_api_key: '411dd1142b5de31e2450',
          pinata_secret_api_key:
            '9508b26f3e6902440bd53fb664ea3cdaaf4db4f40d88cef3cd76105bd240c9d7',
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image to Pinata:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nftData.image) return;

    const imageHash = await uploadImageToPinata(nftData.image);
    if (!imageHash) return;

    const metadata = {
      name: nftData.name,
      description: nftData.description,
      image: `https://gateway.pinata.cloud/ipfs/${imageHash}`,
    };

    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    try {
      const response = await axios.post(url, metadata, {
        headers: {
          pinata_api_key: '411dd1142b5de31e2450',
          pinata_secret_api_key:
            '9508b26f3e6902440bd53fb664ea3cdaaf4db4f40d88cef3cd76105bd240c9d7',
          'Content-Type': 'application/json',
        },
      });

      if (response?.status === 200) {
        blockchainScript(response?.data?.IpfsHash);
        setNftData({ name: '', description: '', image: null });
      }
    } catch (error) {
      console.error('Error uploading metadata to Pinata:', error);
    }
  };

  const openTelegramBot = () => {
    window.open('https://t.me/AirSoul_Bot', '_blank');
  };

  const blockchainScript = async (ipfs: string) => {
    console.log('ipfs', ipfs);
  };

  return (
    <main className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#3569dd]">NFT Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="create"
                className="text-[#447cfb] hover:text-[#3569dd]"
              >
                Mint NFT
              </TabsTrigger>
              <TabsTrigger
                value="view"
                className="text-[#447cfb] hover:text-[#3569dd]"
              >
                Telegram Bot
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="nft-name">NFT Name</Label>
                  <Input
                    id="nft-name"
                    name="name"
                    placeholder="Enter NFT name"
                    value={nftData?.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nft-image">Upload NFT Image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="nft-image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="bg-[#447cfb] hover:bg-[#3569dd] text-white"
                      onClick={() =>
                        document.getElementById('nft-image')?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </Button>
                    <span className="text-sm text-gray-500">
                      {nftData?.image ? nftData?.image?.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nft-description">NFT Description</Label>
                  <Textarea
                    id="nft-description"
                    name="description"
                    placeholder="Enter NFT description"
                    value={nftData?.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#447cfb] hover:bg-[#3569dd] text-white"
                >
                  Submit NFT
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="view">
              <div className="text-center py-4">
                <Button
                  onClick={openTelegramBot}
                  className="bg-[#447cfb] hover:bg-[#3569dd] text-white m-14"
                >
                  Go to Telegram Bot
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
};

export default MainPage;
