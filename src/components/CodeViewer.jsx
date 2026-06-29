import React from 'react';
import { Braces, Database, FileJson, ArrowLeftRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const CodeViewer = ({ data }) => {
  return (
    <Card className="shadow-none border-border overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b py-4 px-6 flex flex-row items-center justify-between space-y-0 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileJson className="text-primary" size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm">مقارنة البيانات والتحويل</h3>
            <p className="text-[11px] text-muted-foreground">تتبع عملية تحويل البيانات من المصدر إلى الهيكلية الموحدة</p>
          </div>
        </div>
        <ArrowLeftRight className="text-muted-foreground/30" size={20} />
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse min-h-[500px]">
          
          {/* Raw Data Column */}
          <div className="flex flex-col h-full overflow-hidden border-l md:border-l-0">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
              <div className="flex items-center gap-2">
                <Database className="text-muted-foreground" size={14} />
                <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">البيانات الخام</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">Source JSON</span>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-transparent code-font text-[13px] leading-relaxed">
              <pre className="text-muted-foreground/70">
                {data ? JSON.stringify(data.raw, null, 2) : '// في انتظار البيانات الخام...'}
              </pre>
            </div>
          </div>

          {/* Unified Structure Column */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <Braces className="text-primary" size={14} />
                <span className="text-[12px] font-bold text-primary uppercase tracking-wider">الهيكلية الموحدة</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">Unified Schema</span>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-primary/[0.02] code-font text-[13px] leading-relaxed">
              <pre className="text-primary">
                {data ? JSON.stringify(data.unified, null, 2) : '// في انتظار البيانات...'}
              </pre>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;

