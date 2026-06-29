import { RefreshCw } from 'lucide-react';
import { API_CONFIGS } from '../configs/providers';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sidebar = ({ 
  sourceId, 
  setSourceId, 
  surah, 
  setSurah, 
  ayah, 
  setAyah, 
  loading, 
  refetch 
}) => {
  return (
    <div className="w-full">
      <Card className="shadow-none border-border overflow-visible">
        <CardContent className="p-2 md:p-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Reference Group */}
            <div className="flex items-center gap-3 bg-muted/30 p-1.5 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 px-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">السورة</span>
                <Input
                  type="number" min="1" max="114"
                  value={surah}
                  onChange={(e) => setSurah(Math.max(1, Math.min(114, parseInt(e.target.value) || 1)))}
                  className="w-14 text-center font-bold h-7 px-1 bg-background"
                />
              </div>
              
              <div className="w-px h-4 bg-border/60" />
              
              <div className="flex items-center gap-2 px-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">الآية</span>
                <Input
                  type="number" min="1"
                  value={ayah}
                  onChange={(e) => setAyah(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center font-bold h-7 px-1 bg-background"
                />
              </div>
            </div>

            {/* Provider Selection Group */}
            <div className="flex-1 flex items-center justify-center gap-4">
              <div className="flex items-center gap-3 w-full max-w-md">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">مزود البيانات</span>
                <Select value={sourceId} onValueChange={setSourceId}>
                  <SelectTrigger className="h-9 w-full bg-background">
                    <SelectValue placeholder="اختر المزود" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(API_CONFIGS).map((cfg) => (
                      <SelectItem key={cfg.id} value={cfg.id}>
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-bold text-xs">{cfg.name}</span>
                          <span className="text-[9px] text-muted-foreground">{cfg.url.replace('https://', '')}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={refetch}
                className="h-9 px-3 gap-2 font-bold text-xs"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                تحديث
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
