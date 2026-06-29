import React from 'react';
import { Layout, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DisplayCard = ({ data, loading, error, refetch, config }) => {
  if (loading) {
    return (
      <Card className="min-h-[450px] flex flex-col justify-center items-center text-center shadow-none">
        <CardContent className="flex flex-col items-center gap-8">
          <div className="w-16 h-16 border-[3px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xl font-bold">جاري جلب الآية...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="min-h-[450px] flex flex-col justify-center items-center text-center shadow-none">
        <CardContent>
          <AlertCircle className="text-destructive mx-auto mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-3">فشل الاتصال</h3>
          <p className="text-muted-foreground text-sm mb-8">{error}</p>
          <Button variant="outline" onClick={refetch}>إعادة المحاولة</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-none border-border relative min-h-[450px] flex flex-col justify-center items-center text-center overflow-hidden">
      <CardContent className="w-full space-y-12 p-8 md:p-16">
        <div className="flex flex-col items-center gap-4">
          <Badge variant="outline" className="px-4 py-1 font-bold text-[10px] uppercase tracking-[0.2em] bg-muted">
            <Layout size={14} className="ml-2" />
            معاينة الواجهة: {config?.name}
          </Badge>
          {config?.fontName && (
            <span className="text-[10px] font-medium text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
              الخط المستخدم: {config.fontName}
            </span>
          )}
        </div>

        <h2 
          className="text-5xl md:text-6xl font-bold text-foreground leading-[1.6] max-w-5xl mx-auto"
          style={{ fontFamily: config?.fontFamily || 'inherit' }}
        >
          {data?.unified.text || '...'}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">المرجع</span>
            <div className="px-6 py-2 border border-border bg-muted/50 rounded-md">
              <span className="font-mono text-primary font-bold text-xl tracking-widest">{data?.unified.key || '--:--'}</span>
            </div>
          </div>
          {data?.unified.meta && Object.entries(data.unified.meta).slice(0, 3).map(([key, val]) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                {key === 'juz' ? 'الجزء' : key === 'page' ? 'الصفحة' : key === 'surah' ? 'السورة' : key}
              </span>
              <div className="px-6 py-2 border border-border bg-muted/50 rounded-md">
                <span className="font-bold text-sm">{String(val)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayCard;
