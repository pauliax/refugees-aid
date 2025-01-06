import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {CheckCircle2, CheckSquare, Coins, HandHeart, HelpCircle} from "lucide-react";
import {useContract} from "@/hooks/useContract";
import {useAccount} from "wagmi";
import {useEffect, useState} from "react";
import {formatEther} from "viem";

export interface Stats {
  askCount: number;
  offerCount: number;
  completedCount: number;
  earnings: bigint;
  isVerified: boolean;
}

function parseUserStats(data: any): Stats {
  return {
    askCount: data[0] as number,
    offerCount: data[1] as number,
    completedCount: data[2] as number,
    earnings: data[3] as bigint,
    isVerified: data[4] as boolean,
  };
}

export const UserStats = () => {
  const [stats, setStats] = useState<Stats>();

  const {address} = useAccount();

  const {
    readData: getUserDetails,
    refetch
  } = useContract({
    functionName: 'getUserDetails',
    args: [address]
  });

  // Manual refetch on interval
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refetch();
        console.log('User details refetch successful');
      } catch (error) {
        console.error('User details refetch failed:', error);
      }
    }, 12_000); // 12 sec

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (!getUserDetails) {
      return;
    }

    setStats(parseUserStats(getUserDetails));
  }, [getUserDetails]);

  if (!stats) {
    return null;
  }

  return (
    <div className="w-full bg-retro-cream py-6 mb-6 border-b border-retro-brown/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-white/50 border-retro-brown/20">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-retro-brown"/>
                <span className="font-mono text-sm text-retro-brown">Asks</span>
              </div>
              <span className="font-mono text-lg font-bold text-retro-brown">{stats.askCount}</span>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-retro-brown/20">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <HandHeart className="w-5 h-5 text-retro-brown"/>
                <span className="font-mono text-sm text-retro-brown">Offers</span>
              </div>
              <span className="font-mono text-lg font-bold text-retro-brown">{stats.offerCount}</span>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-retro-brown/20">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-retro-brown"/>
                <span className="font-mono text-sm text-retro-brown">Completed</span>
              </div>
              <span className="font-mono text-lg font-bold text-retro-brown">{stats.completedCount}</span>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-retro-brown/20">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-retro-brown"/>
                <span className="font-mono text-sm text-retro-brown">Earnings</span>
              </div>
              <span className="font-mono text-lg font-bold text-retro-brown">{formatEther(stats.earnings)} GRASS</span>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-retro-brown/20">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-retro-brown"/>
                <span className="font-mono text-sm text-retro-brown">Status</span>
              </div>
              <Badge variant="outline" className="font-mono border-retro-sage text-retro-sage">
                {stats.isVerified ? 'Verified' : 'Unverified'}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
