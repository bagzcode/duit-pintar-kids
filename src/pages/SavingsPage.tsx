
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, PiggyBank, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const SavingsPage = () => {
  const { user, isAuthenticated, addSaving, updateSavingsGoal } = useAppContext();
  const navigate = useNavigate();
  const [newSaving, setNewSaving] = useState(5000);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState(0);
  const [newWeeklyContribution, setNewWeeklyContribution] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/");
    } else {
      setNewGoalTitle(user.savingsGoal.title);
      setNewGoalAmount(user.savingsGoal.targetAmount);
      setNewWeeklyContribution(user.savingsGoal.weeklyContribution);
    }
  }, [isAuthenticated, navigate, user]);

  if (!user) return null;

  const { savingsGoal } = user;
  const savingsProgress = Math.round(
    (savingsGoal.currentAmount / savingsGoal.targetAmount) * 100
  );

  const handleAddSaving = () => {
    if (newSaving > 0) {
      addSaving(newSaving);
      setNewSaving(5000);
    }
  };

  const handleUpdateGoal = () => {
    updateSavingsGoal({
      title: newGoalTitle,
      targetAmount: newGoalAmount,
      weeklyContribution: newWeeklyContribution
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="dpk-container py-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Celengan Digital</h1>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> 
                  Ubah Target Tabungan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ubah Target Tabungan</DialogTitle>
                  <DialogDescription>
                    Tetapkan target tabungan baru yang ingin kamu capai
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalTitle">Target Tabungan</Label>
                    <Input
                      id="goalTitle"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      placeholder="Misal: Sepeda Baru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goalAmount">Jumlah Target (Rp)</Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      value={newGoalAmount}
                      onChange={(e) => setNewGoalAmount(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeklyContribution">Tabungan Mingguan (Rp)</Label>
                    <Input
                      id="weeklyContribution"
                      type="number"
                      value={newWeeklyContribution}
                      onChange={(e) => setNewWeeklyContribution(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleUpdateGoal}>Simpan</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Savings Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-dpk-purple" />
                  Target: {savingsGoal.title}
                </CardTitle>
                <CardDescription>
                  Lihat progres tabunganmu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{savingsProgress}%</span>
                  </div>
                  <ProgressBar value={savingsProgress} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target</span>
                      <span className="font-medium">
                        Rp {savingsGoal.targetAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Terkumpul</span>
                      <span className="font-bold text-dpk-purple">
                        Rp {savingsGoal.currentAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sisa</span>
                      <span className="font-medium">
                        Rp {(savingsGoal.targetAmount - savingsGoal.currentAmount).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium">Tambah Tabungan</h3>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={newSaving}
                        onChange={(e) => setNewSaving(Number(e.target.value))}
                        min={0}
                        step={1000}
                      />
                      <Button onClick={handleAddSaving}>Tambah</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewSaving(5000)}
                      >
                        Rp 5.000
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewSaving(10000)}
                      >
                        Rp 10.000
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewSaving(20000)}
                      >
                        Rp 20.000
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips Menabung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="p-3 bg-dpk-lightPurple rounded-lg">
                  <p className="font-medium">Tetapkan Target Jelas</p>
                  <p className="text-gray-600">
                    Menabung lebih mudah kalau kamu tahu untuk apa tabunganmu.
                  </p>
                </div>
                <div className="p-3 bg-dpk-lightBlue rounded-lg">
                  <p className="font-medium">Nabung Rutin</p>
                  <p className="text-gray-600">
                    Sisihkan sebagian uang jajanmu setiap minggu.
                  </p>
                </div>
                <div className="p-3 bg-dpk-lightGreen rounded-lg">
                  <p className="font-medium">Kurangi Jajan</p>
                  <p className="text-gray-600">
                    Coba kurangi jajan dan simpan uangnya untuk tabungan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Savings History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Riwayat Tabungan</CardTitle>
              <CardDescription>
                Catatan tabungan yang sudah kamu lakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savingsGoal.history.length > 0 ? (
                    savingsGoal.history.map((entry, index) => (
                      <TableRow key={entry.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{new Date(entry.date).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell>Rp {entry.amount.toLocaleString("id-ID")}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                        Belum ada riwayat tabungan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavingsPage;
